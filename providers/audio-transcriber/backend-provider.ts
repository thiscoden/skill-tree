import type { AudioTranscriberInput, AudioTranscriberProvider, AudioTranscriberResult } from './types';

/** Talks only to our own generic endpoint — never mentions a concrete LLM vendor. */
export class BackendAudioTranscriberProvider implements AudioTranscriberProvider {
  constructor(private readonly baseUrl: string) {}

  async transcribe(input: AudioTranscriberInput): Promise<AudioTranscriberResult> {
    const response = await fetch(`${this.baseUrl}/api/transcribe-audio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`transcribe-audio backend request failed: ${response.status}`);
    }

    return (await response.json()) as AudioTranscriberResult;
  }
}
