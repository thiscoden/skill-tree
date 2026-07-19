export interface TreeGeneratorInput {
  projectTitle: string;
  goalDescription: string;
}

export interface GeneratedTreeNode {
  /** Scoped to this response only — never a real DB id. Used to resolve edges below. */
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface GeneratedTreeEdge {
  from: string;
  to: string;
}

export interface GeneratedTree {
  nodes: GeneratedTreeNode[];
  edges: GeneratedTreeEdge[];
}

/**
 * App-side contract. Never mentions an LLM vendor — implementations may be a local
 * mock (offline default) or a call to our own generic backend endpoint.
 */
export interface TreeGeneratorProvider {
  generateTree(input: TreeGeneratorInput): Promise<GeneratedTree>;
}
