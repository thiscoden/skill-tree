export interface QuestGiverSuggestion {
  title: string;
  description?: string;
  icon?: string;
  type: 'task' | 'capstone';
}

export interface QuestGiverInput {
  projectGoal: string;
  strugglingNote?: string;
  existingNodeTitles: string[];
}

/**
 * App-side contract. Never mentions an LLM vendor — implementations may be a local
 * mock (MVP) or a call to our own generic backend endpoint (later milestone).
 */
export interface QuestGiverProvider {
  suggestNextStep(input: QuestGiverInput): Promise<QuestGiverSuggestion>;
}
