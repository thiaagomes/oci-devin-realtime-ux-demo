import { useEffect, useState } from 'react';

export interface AppMeta {
  name: string;
  version: string;
  build: string | null;
  buildShort: string | null;
  environment: string;
  aiIntegrationConfigured: boolean;
  serverTime: string;
}

export function useAppMeta() {
  const [meta, setMeta] = useState<AppMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/meta', { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<AppMeta>) : Promise.reject(response.status)))
      .then((data) => setMeta(data))
      .catch(() => undefined)
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { meta, loading };
}
