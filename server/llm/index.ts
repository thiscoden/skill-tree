import type { LlmClient } from './types';
import { GeminiClient } from './gemini-client';

const DEFAULT_GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent';
// Cheaper, faster tier — transcription is plain "audio in, text out", no tree reasoning needed.
const DEFAULT_GEMINI_TRANSCRIBE_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

/**
 * Server-only vendor selection. Swapping LLM providers is an env-var + implementation
 * change here — the app client and the /api/quest-giver contract never change.
 */
export function getLlmClient(): LlmClient {
  const provider = process.env.LLM_PROVIDER ?? 'gemini';
  const apiKey = process.env.LLM_API_KEY;
  const endpoint = process.env.LLM_ENDPOINT ?? DEFAULT_GEMINI_ENDPOINT;
  const transcribeEndpoint = process.env.LLM_TRANSCRIBE_ENDPOINT ?? DEFAULT_GEMINI_TRANSCRIBE_ENDPOINT;

  if (!apiKey) {
    throw new Error('LLM_API_KEY is not set. Configure it as a server-only env var — never bundle it into the client.');
  }

  switch (provider) {
    case 'gemini':
      return new GeminiClient(apiKey, endpoint, transcribeEndpoint);
    default:
      throw new Error(`Unknown LLM_PROVIDER "${provider}"`);
  }
}
