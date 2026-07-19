export interface AudioTranscriberInput {
  base64: string;
  mimeType: string;
}

export interface AudioTranscriberResult {
  text: string;
}

/**
 * App-side contract. Never mentions an LLM vendor — implementations may be a local
 * mock (offline default) or a call to our own generic backend endpoint.
 */
export interface AudioTranscriberProvider {
  transcribe(input: AudioTranscriberInput): Promise<AudioTranscriberResult>;
}
