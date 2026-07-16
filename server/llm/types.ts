export interface LlmStructuredStep {
  title: string;
  description?: string;
  icon?: string;
  type: 'task' | 'capstone';
}

export interface LlmPrompt {
  projectGoal: string;
  strugglingNote?: string;
  existingNodeTitles: string[];
}

/** Backend-internal vendor abstraction — the app client never sees this. */
export interface LlmClient {
  generateStructuredStep(prompt: LlmPrompt): Promise<LlmStructuredStep>;
}
