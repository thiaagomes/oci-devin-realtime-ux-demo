import { Router } from 'express';
import { config } from '../config';

export const metaRouter = Router();

metaRouter.get('/api/meta', (_req, res) => {
  res.status(200).json({
    name: 'Real-Time UX with OCI + Devin',
    version: config.appVersion,
    build: config.gitSha,
    buildShort: config.gitSha ? config.gitSha.slice(0, 7) : null,
    environment: process.env.NODE_ENV ?? 'development',
    aiIntegrationConfigured: false,
    serverTime: new Date().toISOString(),
  });
});
