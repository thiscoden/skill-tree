import type { LlmClient, LlmPrompt, LlmStructuredStep } from './types';

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    description: { type: 'STRING' },
    icon: { type: 'STRING' },
    type: { type: 'STRING', enum: ['task', 'capstone'] },
  },
  required: ['title', 'type'],
};

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

    const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: RESPONSE_SCHEMA,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini request failed: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    const text: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini response missing structured content');

    const parsed = JSON.parse(text) as LlmStructuredStep;
    if (!parsed.title || !parsed.type) throw new Error('Gemini response failed schema validation');
    return parsed;
  }
}
