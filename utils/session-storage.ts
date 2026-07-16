import 'expo-sqlite/localStorage/install';

const SELECTED_PROJECT_KEY = 'selected_project_id';

type Listener = () => void;
const listeners = new Set<Listener>();

export function getSelectedProjectId(): string | null {
  return localStorage.getItem(SELECTED_PROJECT_KEY);
}

export function setSelectedProjectId(id: string | null): void {
  if (id === null) {
    localStorage.removeItem(SELECTED_PROJECT_KEY);
  } else {
    localStorage.setItem(SELECTED_PROJECT_KEY, id);
  }
  listeners.forEach((fn) => fn());
}

export function subscribeSelectedProjectId(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
