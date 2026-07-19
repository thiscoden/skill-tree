import type { AudioTranscriberProvider } from './types';
import { MockAudioTranscriberProvider } from './mock-provider';
import { BackendAudioTranscriberProvider } from './backend-provider';

let instance: AudioTranscriberProvider | null = null;

/**
 * Single swap point, same pattern as providers/tree-generator/index.ts. Defaults to the
 * (throwing) offline mock. Set EXPO_PUBLIC_LLM_BACKEND_URL to switch to the real backend.
 */
export function getAudioTranscriberProvider(): AudioTranscriberProvider {
  if (!instance) {
    const backendUrl = process.env.EXPO_PUBLIC_LLM_BACKEND_URL;
    instance = backendUrl ? new BackendAudioTranscriberProvider(backendUrl) : new MockAudioTranscriberProvider();
  }
  return instance;
}
