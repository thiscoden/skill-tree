import { getLlmClient } from '@/server/llm';

// Same posture as /api/generate-tree: no user accounts to gate on, so caps + rate limiter are
// the only cost-abuse guard.
// Gemini's inline-audio request cap is 20 MB total; base64 inflates raw bytes by ~4/3, so this
// leaves comfortable headroom for the JSON envelope and prompt text alongside it.
const MAX_AUDIO_BASE64_LENGTH = 18_000_000;
const SUPPORTED_AUDIO_MIME_TYPES = new Set([
  'audio/wav',
  'audio/mp3',
  'audio/aiff',
  'audio/aac',
  'audio/ogg',
  'audio/flac',
]);

// Same cross-origin situation as /api/generate-tree: EXPO_PUBLIC_LLM_BACKEND_URL is typically a
// LAN IP for native clients, which is a different origin than the web page's own "localhost".
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
// Single-process, in-memory sliding window — same caveat as /api/generate-tree's limiter.
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

/** Generic, vendor-neutral endpoint. Only server/llm knows a real LlmClient exists. */
export async function POST(request: Request) {
  const clientKey = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(clientKey)) {
    return Response.json({ error: 'Too many requests, slow down.' }, { status: 429, headers: CORS_HEADERS });
  }

  const body = await request.json();

  const mimeType = body.mimeType;
  const base64 = body.base64;

  if (typeof mimeType !== 'string' || !SUPPORTED_AUDIO_MIME_TYPES.has(mimeType)) {
    return Response.json({ error: 'mimeType is not a supported audio format' }, { status: 400, headers: CORS_HEADERS });
  }
  if (typeof base64 !== 'string' || base64.length === 0) {
    return Response.json({ error: 'base64 is required' }, { status: 400, headers: CORS_HEADERS });
  }
  if (base64.length > MAX_AUDIO_BASE64_LENGTH) {
    return Response.json({ error: 'audio exceeds the maximum allowed size' }, { status: 400, headers: CORS_HEADERS });
  }

  try {
    const llm = getLlmClient();
    const { text } = await llm.transcribeAudio({ audio: { base64, mimeType } });
    return Response.json({ text }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('transcribe-audio endpoint failed', error);
    return Response.json({ error: 'Failed to transcribe audio' }, { status: 502, headers: CORS_HEADERS });
  }
}
