import type { QuestGiverProvider } from './types';
import { MockQuestGiverProvider } from './mock-provider';
import { BackendQuestGiverProvider } from './backend-provider';

let instance: QuestGiverProvider | null = null;

/**
 * Single swap point. Defaults to the offline mock (MVP, M5). Set EXPO_PUBLIC_LLM_BACKEND_URL
 * once /api/quest-giver is actually deployed (M6) to switch to the real backend — no other
 * call site changes. Note: the KI-Orb feature itself is currently disabled, see
 * app/(tabs)/tree.tsx and app/_layout.tsx — this file is unreached dead code until then.
 */
export function getQuestGiverProvider(): QuestGiverProvider {
  if (!instance) {
    const backendUrl = process.env.EXPO_PUBLIC_LLM_BACKEND_URL;
    instance = backendUrl ? new BackendQuestGiverProvider(backendUrl) : new MockQuestGiverProvider();
  }
  return instance;
}
