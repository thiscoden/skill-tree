import type { TreeGeneratorProvider } from './types';
import { MockTreeGeneratorProvider } from './mock-provider';
import { BackendTreeGeneratorProvider } from './backend-provider';

let instance: TreeGeneratorProvider | null = null;

/**
 * Single swap point. Defaults to the offline mock. Set EXPO_PUBLIC_LLM_BACKEND_URL
 * once /api/generate-tree is actually deployed to switch to the real backend — no
 * other call site changes.
 */
export function getTreeGeneratorProvider(): TreeGeneratorProvider {
  if (!instance) {
    const backendUrl = process.env.EXPO_PUBLIC_LLM_BACKEND_URL;
    instance = backendUrl ? new BackendTreeGeneratorProvider(backendUrl) : new MockTreeGeneratorProvider();
  }
  return instance;
}
