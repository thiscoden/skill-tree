import type { GeneratedTree, TreeGeneratorInput, TreeGeneratorProvider } from './types';

/** Talks only to our own generic endpoint — never mentions a concrete LLM vendor. */
export class BackendTreeGeneratorProvider implements TreeGeneratorProvider {
  constructor(private readonly baseUrl: string) {}

  async generateTree(input: TreeGeneratorInput): Promise<GeneratedTree> {
    const response = await fetch(`${this.baseUrl}/api/generate-tree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`generate-tree backend request failed: ${response.status}`);
    }

    return (await response.json()) as GeneratedTree;
  }
}
