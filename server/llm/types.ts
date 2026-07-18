export interface LlmExistingNode {
  id: string;
  title: string;
}

export interface LlmStructuredStep {
  title: string;
  description?: string;
  icon?: string;
  type: 'task';
  /** Ids (from LlmPrompt.existingNodes) of steps that must be done before this one. */
  prerequisiteNodeIds: string[];
}

export interface LlmPrompt {
  projectGoal: string;
  strugglingNote?: string;
  existingNodes: LlmExistingNode[];
}

/** Backend-internal vendor abstraction — the app client never sees this. */
export interface LlmClient {
  generateStructuredStep(prompt: LlmPrompt): Promise<LlmStructuredStep>;
}
