import type { QuestGiverProvider } from './types';
import { MockQuestGiverProvider } from './mock-provider';
import { BackendQuestGiverProvider } from './backend-provider';

let instance: QuestGiverProvider | null = null;

/**
 * Single swap point. Defaults to the offline mock (MVP, M5). Set
 * EXPO_PUBLIC_QUEST_GIVER_BACKEND_URL once /api/quest-giver is actually deployed
 * (M6) to switch to the real backend — no other call site changes.
 */
export function getQuestGiverProvider(): QuestGiverProvider {
  if (!instance) {
    const backendUrl = process.env.EXPO_PUBLIC_QUEST_GIVER_BACKEND_URL;
    instance = backendUrl ? new BackendQuestGiverProvider(backendUrl) : new MockQuestGiverProvider();
  }
  return instance;
}
