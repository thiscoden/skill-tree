export interface QuestGiverExistingNode {
  id: string;
  title: string;
}

export interface QuestGiverSuggestion {
  title: string;
  description?: string;
  icon?: string;
  type: 'task';
  /** Ids (from QuestGiverInput.existingNodes) of steps that must be done before this one. */
  prerequisiteNodeIds: string[];
}

export interface QuestGiverInput {
  projectGoal: string;
  strugglingNote?: string;
  existingNodes: QuestGiverExistingNode[];
}

/**
 * App-side contract. Never mentions an LLM vendor — implementations may be a local
 * mock (MVP) or a call to our own generic backend endpoint (later milestone).
 */
export interface QuestGiverProvider {
  suggestNextStep(input: QuestGiverInput): Promise<QuestGiverSuggestion>;
}
