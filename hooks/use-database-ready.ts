import { useEffect, useState } from 'react';
import { migrate } from '@/db/schema';

/** Runs schema migrations once and reports readiness. Call at the app root before any query. */
export function useDatabaseReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    migrate().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
