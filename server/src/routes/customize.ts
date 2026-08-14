import { Router } from 'express';
import { randomUUID } from 'crypto';
import { config } from '../config';

export const customizeRouter = Router();

const PIPELINE_STAGES = ['request-received', 'oci-agent', 'devin', 'new-version-ready'] as const;

customizeRouter.post('/api/customize', (req, res) => {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';

  if (!prompt) {
    res.status(400).json({
      accepted: false,
      error: 'MISSING_PROMPT',
      message: 'Describe how you would like the experience to change.',
    });
    return;
  }

  res.status(501).json({
    accepted: false,
    requestId: randomUUID(),
    receivedPrompt: prompt,
    aiIntegrationConfigured: false,
    provider: config.aiProvider,
    stages: PIPELINE_STAGES,
    reachedStage: 'request-received',
    message:
      'AI integration is not configured yet. This V1 baseline records the request only - OCI Generative AI and the Devin API will be connected in a later version.',
  });
});
