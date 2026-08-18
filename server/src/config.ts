import path from 'path';

export interface AppConfig {
  port: number;
  appVersion: string;
  gitSha: string | null;
  clientDir: string;
  ociAgentEndpointId: string | null;
  ociRegion: string;
  devinSecretId: string | null;
  devinOrgId: string;
  devinRepository: string;
  ocirRepository: string;
  aiProvider: string;
}

const projectRoot = path.resolve(__dirname, '..', '..');

export const config: AppConfig = {
  port: Number(process.env.PORT ?? 8080),
  appVersion: process.env.APP_VERSION ?? 'v1',
  gitSha: process.env.GIT_SHA ?? null,
  clientDir: process.env.CLIENT_DIR ?? path.join(projectRoot, 'client', 'dist'),
  ociAgentEndpointId: process.env.OCI_AGENT_ENDPOINT_ID ?? null,
  ociRegion: process.env.OCI_REGION ?? 'sa-saopaulo-1',
  devinSecretId: process.env.DEVIN_SECRET_ID ?? null,
  devinOrgId: process.env.DEVIN_ORG_ID ?? 'org-af5d73218a7f463d93989a0ac75db2f9',
  devinRepository: process.env.DEVIN_REPOSITORY ?? 'thiaagomes/oci-devin-realtime-ux-demo',
  ocirRepository: process.env.OCIR_REPOSITORY ?? 'gru.ocir.io/grgsn7hp8u4w/oci-devin-realtime-ux-demo',
  aiProvider: process.env.AI_PROVIDER ?? 'oci-genai-agent',
};

export const aiIntegrationConfigured = Boolean(config.ociAgentEndpointId?.trim() && config.devinSecretId?.trim());
