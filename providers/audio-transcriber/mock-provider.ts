import type { AudioTranscriberInput, AudioTranscriberProvider, AudioTranscriberResult } from './types';

/**
 * Transcription always needs a real LLM to listen to the audio — there's no meaningful offline
 * fallback. The mic control is hidden via isBackendConfigured() whenever this provider would be
 * selected, so this path shouldn't be reachable in practice; it exists for symmetry with
 * providers/tree-generator/mock-provider.ts and to fail loudly if that gating is ever bypassed.
 */
export class MockAudioTranscriberProvider implements AudioTranscriberProvider {
  async transcribe(_input: AudioTranscriberInput): Promise<AudioTranscriberResult> {
    throw new Error('Audio transcription requires a configured LLM backend.');
  }
}
