import { useSyncExternalStore } from 'react';
import {
  getSelectedProjectId,
  setSelectedProjectId,
  subscribeSelectedProjectId,
} from '@/utils/session-storage';

export function useActiveProjectId(): [string | null, (id: string | null) => void] {
  const id = useSyncExternalStore(subscribeSelectedProjectId, getSelectedProjectId);
  return [id, setSelectedProjectId];
}
