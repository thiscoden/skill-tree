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
  projectTitle: string;
  existingNodes: LlmExistingNode[];
}

export interface LlmAudio {
  base64: string;
  mimeType: string;
}

export interface LlmTreePrompt {
  projectTitle: string;
  goalDescription: string;
}

export interface LlmGeneratedNode {
  /** Scoped to this response only — never a real DB id. Used to resolve edges below. */
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface LlmGeneratedEdge {
  from: string;
  to: string;
}

export interface LlmGeneratedTree {
  nodes: LlmGeneratedNode[];
  edges: LlmGeneratedEdge[];
}

/** Backend-internal vendor abstraction — the app client never sees this. */
export interface LlmClient {
  generateStructuredStep(prompt: LlmPrompt): Promise<LlmStructuredStep>;
  generateSkillTree(prompt: LlmTreePrompt): Promise<LlmGeneratedTree>;
  transcribeAudio(input: { audio: LlmAudio }): Promise<{ text: string }>;
}
