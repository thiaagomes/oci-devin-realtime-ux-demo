import { Router } from 'express';
import { randomUUID } from 'crypto';
import type { models } from 'oci-generativeaiagentruntime';
import { aiIntegrationConfigured, config } from '../config';
import { chat, createSession } from '../services/ociAgent';
import { buildDevinPrompt, createDevinSession } from '../services/devin';
import { getDevinAuthorization } from '../services/vaultSecret';

export const customizeRouter = Router();

const PIPELINE_STAGES = ['request-received', 'oci-agent', 'devin', 'new-version-ready'] as const;
type PipelineStage =
  | 'agent-session'
  | 'agent-chat'
  | 'function-call-parsing'
  | 'vault-secret'
  | 'devin-api'
  | 'agent-performed-action';

function logPipelineError(stage: PipelineStage, requestId: string, error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown pipeline error';
  const sanitized = message
    .replace(/Bearer\s+\S+/gi, '[redacted]')
    .replace(/(authorization|credential|secret|token)\s*[:=]?\s*\S+/gi, '$1=[redacted]')
    .slice(0, 200);
  console.error(`[customize] stage=${stage} requestId=${requestId} error=${sanitized}`);
}

function reachedStageFor(stage: PipelineStage) {
  if (stage === 'agent-session') return 'request-received';
  if (stage === 'agent-chat' || stage === 'function-call-parsing') return 'oci-agent';
  return 'devin';
}

function failureMessage(stage: PipelineStage) {
  if (stage === 'agent-session' || stage === 'agent-chat' || stage === 'function-call-parsing') {
    return 'The OCI agent could not prepare this request.';
  }
  if (stage === 'vault-secret') return 'The Devin connection could not be authorized.';
  if (stage === 'devin-api') return 'Devin could not create a session.';
  return 'The OCI agent could not finalize this request.';
}

customizeRouter.post('/api/customize', async (req, res) => {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';

  if (!prompt) {
    res.status(400).json({
      accepted: false,
      error: 'MISSING_PROMPT',
      message: 'Describe how you would like the experience to change.',
    });
    return;
  }

  const requestId = randomUUID();
  if (!aiIntegrationConfigured) {
    res.status(501).json({
      accepted: false,
      requestId,
      receivedPrompt: prompt,
      aiIntegrationConfigured: false,
      provider: config.aiProvider,
      stages: PIPELINE_STAGES,
      reachedStage: 'request-received',
      message:
        'AI integration is not configured yet. This V1 baseline records the request only - OCI Generative AI and the Devin API will be connected in a later version.',
    });
    return;
  }

  let stage: PipelineStage = 'agent-session';
  try {
    stage = 'agent-session';
    const agentSession = await createSession(
      config.ociAgentEndpointId!,
      'Devin UX customization',
      'Prepare a deterministic UI/UX customization request for Devin.',
    );

    stage = 'agent-chat';
    const firstChat = await chat(config.ociAgentEndpointId!, {
      sessionId: agentSession.id,
      userMessage: prompt,
      shouldStream: false,
    });

    stage = 'function-call-parsing';
    const action = firstChat.requiredActions?.find((candidate) => {
      const functionCall = (candidate as models.FunctionCallingRequiredAction).functionCall;
      return (
        candidate.requiredActionType === 'FUNCTION_CALLING_REQUIRED_ACTION' &&
        functionCall?.name === 'create_devin_ux_session'
      );
    }) as models.FunctionCallingRequiredAction | undefined;
    if (!action) throw new Error('Expected create_devin_ux_session function call was not returned');

    let argumentsPayload: { request?: unknown; title?: unknown };
    try {
      argumentsPayload = JSON.parse(action.functionCall.arguments) as { request?: unknown; title?: unknown };
    } catch {
      throw new Error('Agent function call arguments were invalid');
    }
    if (typeof argumentsPayload.request !== 'string' || !argumentsPayload.request.trim()) {
      throw new Error('Agent function call did not include a request');
    }
    const title =
      typeof argumentsPayload.title === 'string' && argumentsPayload.title.trim()
        ? argumentsPayload.title
        : 'Devin UX customization';

    stage = 'vault-secret';
    const authorization = await getDevinAuthorization();

    stage = 'devin-api';
    const devinSession = await createDevinSession(authorization, buildDevinPrompt(argumentsPayload.request), title);

    stage = 'agent-performed-action';
    const finalChat = await chat(config.ociAgentEndpointId!, {
      sessionId: agentSession.id,
      shouldStream: false,
      performedActions: [
        {
          performedActionType: 'FUNCTION_CALLING_PERFORMED_ACTION',
          actionId: action.actionId,
          functionCallOutput: JSON.stringify({
            session_id: devinSession.session_id,
            url: devinSession.url,
            status: devinSession.status,
            title: devinSession.title,
          }),
        } as models.FunctionCallingPerformedAction,
      ],
    });

    res.status(200).json({
      accepted: true,
      requestId,
      receivedPrompt: prompt,
      aiIntegrationConfigured: true,
      provider: config.aiProvider,
      stages: PIPELINE_STAGES,
      reachedStage: 'devin',
      message: finalChat.message?.content?.text || 'Devin session created and the request is ready for execution.',
      devinSessionId: devinSession.session_id,
      devinSessionUrl: devinSession.url,
      devinStatus: devinSession.status,
    });
  } catch (error) {
    logPipelineError(stage, requestId, error);
    res.status(502).json({
      accepted: false,
      requestId,
      receivedPrompt: prompt,
      provider: config.aiProvider,
      stages: PIPELINE_STAGES,
      reachedStage: reachedStageFor(stage),
      error: 'AI_PIPELINE_FAILED',
      failedStage: stage,
      message: failureMessage(stage),
    });
  }
});
