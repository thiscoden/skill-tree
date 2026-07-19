import { getLlmClient } from '@/server/llm';

// Same posture as /api/quest-giver: no user accounts to gate on (local-first app, auth is a
// future milestone), so these caps and the rate limiter are the only cost-abuse guard. Caps are
// far more generous here — a full goal description needs real room, unlike a single-step title.
const MAX_PROJECT_TITLE_LENGTH = 300;
const MAX_GOAL_DESCRIPTION_LENGTH = 4000;

// The Expo web client and this API route are the same server, but EXPO_PUBLIC_LLM_BACKEND_URL is
// typically a LAN IP (so a native/Android client can reach it) — from a browser that's a different
// origin than the page's own "localhost", so plain fetch() gets blocked without CORS headers here.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
// Single-process, in-memory sliding window. Resets on redeploy/restart and isn't shared across
// instances — acceptable for a single-instance MVP, not a substitute for a real gateway-level
// limiter once this is deployed behind multiple instances.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

/** Generic, vendor-neutral endpoint. Only this file knows a real LlmClient exists. */
export async function POST(request: Request) {
  const clientKey = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(clientKey)) {
    return Response.json({ error: 'Too many requests, slow down.' }, { status: 429, headers: CORS_HEADERS });
  }

  const body = await request.json();

  const projectTitle =
    typeof body.projectTitle === 'string' ? body.projectTitle.slice(0, MAX_PROJECT_TITLE_LENGTH) : '';
  const goalDescription =
    typeof body.goalDescription === 'string' ? body.goalDescription.slice(0, MAX_GOAL_DESCRIPTION_LENGTH) : '';

  if (!projectTitle) {
    return Response.json({ error: 'projectTitle is required' }, { status: 400, headers: CORS_HEADERS });
  }

  try {
    const llm = getLlmClient();
    const tree = await llm.generateSkillTree({ projectTitle, goalDescription });
    return Response.json(tree, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('generate-tree endpoint failed', error);
    return Response.json({ error: 'Failed to generate a skill tree' }, { status: 502, headers: CORS_HEADERS });
  }
}
