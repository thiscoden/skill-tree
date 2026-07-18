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
  /** The project's own name — the only project-level context the Orb gets. */
  projectTitle: string;
  /** Already filtered to meaningful titles (see domain/title-quality.ts) before this is built. */
  existingNodes: QuestGiverExistingNode[];
}

/**
 * App-side contract. Never mentions an LLM vendor — implementations may be a local
 * mock (MVP) or a call to our own generic backend endpoint (later milestone).
 */
export interface QuestGiverProvider {
  suggestNextStep(input: QuestGiverInput): Promise<QuestGiverSuggestion>;
}
