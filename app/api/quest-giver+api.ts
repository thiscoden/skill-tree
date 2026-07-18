import { getLlmClient } from '@/server/llm';

// This endpoint proxies to a paid, external LLM API with no user accounts to gate
// on (local-first app, auth is a future milestone) — these caps and the rate limiter
// below are the only things standing between it and an open cost-abuse vector.
const MAX_GOAL_LENGTH = 500;
const MAX_NOTE_LENGTH = 500;
const MAX_EXISTING_TITLES = 50;
const MAX_TITLE_LENGTH = 200;

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

  const projectGoal = typeof body.projectGoal === 'string' ? body.projectGoal.slice(0, MAX_GOAL_LENGTH) : '';
  const strugglingNote =
    typeof body.strugglingNote === 'string' ? body.strugglingNote.slice(0, MAX_NOTE_LENGTH) : undefined;
  const existingNodeTitles = Array.isArray(body.existingNodeTitles)
    ? body.existingNodeTitles
        .filter((t: unknown): t is string => typeof t === 'string')
        .slice(0, MAX_EXISTING_TITLES)
        .map((t: string) => t.slice(0, MAX_TITLE_LENGTH))
    : [];

  if (!projectGoal) {
    return Response.json({ error: 'projectGoal is required' }, { status: 400 });
  }

  try {
    const llm = getLlmClient();
    const step = await llm.generateStructuredStep({ projectGoal, strugglingNote, existingNodeTitles });
    return Response.json(step);
  } catch (error) {
    console.error('quest-giver endpoint failed', error);
    return Response.json({ error: 'Failed to generate a suggestion' }, { status: 502 });
  }
}
