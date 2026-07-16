import type { QuestGiverInput, QuestGiverProvider, QuestGiverSuggestion } from './types';

/** Talks only to our own generic endpoint — never mentions a concrete LLM vendor. */
export class BackendQuestGiverProvider implements QuestGiverProvider {
  constructor(private readonly baseUrl: string) {}

  async suggestNextStep(input: QuestGiverInput): Promise<QuestGiverSuggestion> {
    const response = await fetch(`${this.baseUrl}/api/quest-giver`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`quest-giver backend request failed: ${response.status}`);
    }

    return (await response.json()) as QuestGiverSuggestion;
  }
}
