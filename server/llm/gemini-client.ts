import type { LlmClient, LlmPrompt, LlmStructuredStep } from './types';

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    description: { type: 'STRING' },
    icon: { type: 'STRING' },
    type: { type: 'STRING', enum: ['task'] },
  },
  required: ['title', 'type'],
};

const REQUEST_TIMEOUT_MS = 15_000;
const VALID_TYPES = new Set(['task']);

/** MVP implementation: Google Gemini API via Google AI Studio, structured JSON output. */
export class GeminiClient implements LlmClient {
  constructor(
    private readonly apiKey: string,
    private readonly endpoint: string
  ) {}

  async generateStructuredStep(prompt: LlmPrompt): Promise<LlmStructuredStep> {
    const promptText = [
      `Ziel des Nutzers: ${prompt.projectGoal}`,
      prompt.strugglingNote ? `Aktueller Stolperstein: ${prompt.strugglingNote}` : null,
      `Bereits vorhandene Schritte: ${prompt.existingNodeTitles.join(', ') || 'keine'}`,
      'Schlage GENAU EINEN nicht-prokrastinierbaren, konkreten nächsten Baby-Step vor (max. 2 Minuten Einstiegsaufwand). Antworte ausschließlich als JSON gemäß Schema.',
    ]
      .filter(Boolean)
      .join('\n');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      // Key goes in a header, never the URL — query strings end up in access logs and
      // proxy history, headers on this endpoint don't.
      response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': this.apiKey },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      // Truncated, status-only detail — the upstream body is never trusted to be safe to log in full.
      throw new Error(`Gemini request failed: ${response.status} ${(await response.text()).slice(0, 200)}`);
    }

    const data = await response.json();
    const text: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini response missing structured content');

    const parsed = JSON.parse(text) as LlmStructuredStep;
    if (!parsed.title || !VALID_TYPES.has(parsed.type)) {
      throw new Error('Gemini response failed schema validation');
    }
    return parsed;
  }
}
