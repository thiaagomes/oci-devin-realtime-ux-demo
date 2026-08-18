import * as common from 'oci-common';
import { GenerativeAiAgentRuntimeClient, type models, type responses } from 'oci-generativeaiagentruntime';
import { config } from '../config';

let provider: common.ResourcePrincipalAuthenticationDetailsProvider | undefined;
let client: GenerativeAiAgentRuntimeClient | undefined;

function getProvider() {
  provider ??= common.ResourcePrincipalAuthenticationDetailsProvider.builder();
  return provider;
}

function getClient() {
  client ??= new GenerativeAiAgentRuntimeClient({
    authenticationDetailsProvider: getProvider(),
  });
  client.region = common.Region.fromRegionId(config.ociRegion);
  return client;
}

export async function createSession(agentEndpointId: string, displayName: string, description: string) {
  const response = await getClient().createSession({
    agentEndpointId,
    createSessionDetails: { displayName, description },
  });
  return response.session;
}

export async function chat(agentEndpointId: string, chatDetails: models.ChatDetails) {
  const result = await getClient().chat({ agentEndpointId, chatDetails });
  if (!result || !('chatResult' in result)) {
    throw new Error('OCI Agent returned an empty or streamed response');
  }
  return (result as responses.ChatResponse).chatResult;
}
