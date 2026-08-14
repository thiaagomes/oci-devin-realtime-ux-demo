import path from 'path';

export interface AppConfig {
  port: number;
  appVersion: string;
  gitSha: string | null;
  clientDir: string;
  aiProvider: string | null;
}

const projectRoot = path.resolve(__dirname, '..', '..');

export const config: AppConfig = {
  port: Number(process.env.PORT ?? 8080),
  appVersion: process.env.APP_VERSION ?? 'v1',
  gitSha: process.env.GIT_SHA ?? null,
  clientDir: process.env.CLIENT_DIR ?? path.join(projectRoot, 'client', 'dist'),
  aiProvider: process.env.AI_PROVIDER ?? null,
};
