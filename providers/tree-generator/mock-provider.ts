import type { GeneratedTree, TreeGeneratorInput, TreeGeneratorProvider } from './types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deterministic, network-free tree generation — lets the "create project" flow be exercised
 * fully offline without an LLM backend configured. Always produces the same small shape:
 * one root, two parallel steps, one step that needs both finished first.
 */
export class MockTreeGeneratorProvider implements TreeGeneratorProvider {
  async generateTree(input: TreeGeneratorInput): Promise<GeneratedTree> {
    await delay(600);

    const goal = input.projectTitle.trim() || 'dein Projekt';

    return {
      nodes: [
        { id: 'n1', title: 'Ziel klären', description: `Halte in ein bis zwei Sätzen fest, was "${goal}" konkret bedeutet.` },
        { id: 'n2', title: 'Erste Recherche', description: 'Sammle die wichtigsten Infos, die du für den Einstieg brauchst.' },
        { id: 'n3', title: 'Plan skizzieren', description: 'Grobe Reihenfolge der nächsten Schritte aufschreiben.' },
        { id: 'n4', title: 'Ersten Schritt umsetzen', description: 'Den ersten konkreten Schritt aus dem Plan erledigen.' },
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n1', to: 'n3' },
        { from: 'n2', to: 'n4' },
        { from: 'n3', to: 'n4' },
      ],
    };
  }
}
