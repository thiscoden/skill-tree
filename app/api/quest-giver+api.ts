import { getLlmClient } from '@/server/llm';

// This endpoint proxies to a paid, external LLM API with no user accounts to gate
// on (local-first app, auth is a future milestone) — these caps and the rate limiter
// below are the only things standing between it and an open cost-abuse vector.
const MAX_PROJECT_TITLE_LENGTH = 200;
const MAX_EXISTING_NODES = 50;
const MAX_TITLE_LENGTH = 200;
const MAX_ID_LENGTH = 100;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
// Single-process, in-memory sliding window. Resets on redeploy/restart and isn't
// shared across instances — acceptable for a single-instance MVP, not a substitute
// for a real gateway-level limiter once this is deployed behind multiple instances.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

/** Generic, vendor-neutral endpoint. Only this file knows a real LlmClient exists. */
export async function POST(request: Request) {
  const clientKey = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(clientKey)) {
    return Response.json({ error: 'Too many requests, slow down.' }, { status: 429 });
  }

  const body = await request.json();

  const projectTitle =
    typeof body.projectTitle === 'string' ? body.projectTitle.slice(0, MAX_PROJECT_TITLE_LENGTH) : '';
  const existingNodes = Array.isArray(body.existingNodes)
    ? body.existingNodes
        .filter((n: unknown): n is { id: unknown; title: unknown } => typeof n === 'object' && n !== null)
        .map((n: { id: unknown; title: unknown }) => ({
          id: typeof n.id === 'string' ? n.id.slice(0, MAX_ID_LENGTH) : '',
          title: typeof n.title === 'string' ? n.title.slice(0, MAX_TITLE_LENGTH) : '',
        }))
        .filter((n: { id: string; title: string }) => n.id && n.title)
        .slice(0, MAX_EXISTING_NODES)
    : [];

  if (!projectTitle) {
    return Response.json({ error: 'projectTitle is required' }, { status: 400 });
  }

  try {
    const llm = getLlmClient();
    const step = await llm.generateStructuredStep({ projectTitle, existingNodes });
    return Response.json(step);
  } catch (error) {
    console.error('quest-giver endpoint failed', error);
    return Response.json({ error: 'Failed to generate a suggestion' }, { status: 502 });
  }
}
