import { config } from '../config';

export interface DevinSession {
  session_id: string;
  url: string;
  status: string;
  title: string;
}

export function buildDevinPrompt(request: string) {
  return `Work only on the repository ${config.devinRepository}.
Implement only the exact requested UI/UX change: ${request}.
Preserve existing functionality; do not refactor unrelated code.
Do not create a detailed test plan; perform only minimum validation.
Create a feature branch, commit and push, open a Pull Request against main, never merge automatically.
Build a linux/amd64 Docker image and verify GET /health returns HTTP 200.
Push a new versioned image to ${config.ocirRepository}.
Prioritize execution speed.`;
}

export async function createDevinSession(authorization: string, prompt: string, title: string): Promise<DevinSession> {
  const response = await fetch(`https://api.devin.ai/v3/organizations/${config.devinOrgId}/sessions`, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, title, devin_mode: 'normal' }),
  });

  if (!response.ok) {
    throw new Error(`Devin API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as Partial<DevinSession>;
  if (!data.session_id || !data.url || !data.title) {
    throw new Error('Devin API returned an incomplete session');
  }
  return {
    session_id: data.session_id,
    url: data.url,
    status: data.status ?? 'new',
    title: data.title,
  };
}
