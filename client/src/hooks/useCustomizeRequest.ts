import { useCallback, useState } from 'react';

export type StageStatus = 'pending' | 'active' | 'done' | 'blocked';

export interface CustomizeResponse {
  accepted: boolean;
  requestId?: string;
  message: string;
  aiIntegrationConfigured?: boolean;
  reachedStage?: string;
}

export type RequestState = 'idle' | 'submitting' | 'answered' | 'error';

const STAGE_ORDER = ['request-received', 'oci-agent', 'devin', 'new-version-ready'];

export function useCustomizeRequest() {
  const [state, setState] = useState<RequestState>('idle');
  const [response, setResponse] = useState<CustomizeResponse | null>(null);
  const [reachedStage, setReachedStage] = useState<string | null>(null);

  const submit = useCallback(async (prompt: string) => {
    setState('submitting');
    setResponse(null);
    setReachedStage(null);

    try {
      const res = await fetch('/api/customize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as CustomizeResponse;
      setResponse(data);
      setReachedStage(data.reachedStage ?? 'request-received');
      setState('answered');
    } catch {
      setResponse({
        accepted: false,
        message: 'The experience API could not be reached. Check that the server is running and try again.',
      });
      setState('error');
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setResponse(null);
    setReachedStage(null);
  }, []);

  const stageStatus = useCallback(
    (stageId: string): StageStatus => {
      if (state === 'idle') return 'pending';
      if (state === 'submitting') {
        return stageId === STAGE_ORDER[0] ? 'active' : 'pending';
      }
      if (state === 'error') {
        return stageId === STAGE_ORDER[0] ? 'blocked' : 'pending';
      }

      const reachedIndex = STAGE_ORDER.indexOf(reachedStage ?? STAGE_ORDER[0]);
      const stageIndex = STAGE_ORDER.indexOf(stageId);

      if (stageIndex <= reachedIndex) return 'done';
      if (stageIndex === reachedIndex + 1) return 'blocked';
      return 'pending';
    },
    [reachedStage, state],
  );

  return { state, response, submit, reset, stageStatus };
}
