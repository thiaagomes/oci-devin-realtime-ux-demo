import * as common from 'oci-common';
import { SecretsClient, requests, type models } from 'oci-secrets';
import { config } from '../config';

let client: SecretsClient | undefined;
let cachedAuthorization: string | undefined;

function getClient() {
  client ??= new SecretsClient({
    authenticationDetailsProvider: common.ResourcePrincipalAuthenticationDetailsProvider.builder(),
  });
  client.region = common.Region.fromRegionId(config.ociRegion);
  return client;
}

export async function getDevinAuthorization() {
  if (cachedAuthorization) return cachedAuthorization;
  if (!config.devinSecretId) throw new Error('Devin secret is not configured');

  const response = await getClient().getSecretBundle({
    secretId: config.devinSecretId,
    stage: requests.GetSecretBundleRequest.Stage.Current,
  });
  const content = response.secretBundle.secretBundleContent as models.Base64SecretBundleContentDetails | undefined;
  if (!content?.content) throw new Error('Devin secret content is empty');

  cachedAuthorization = Buffer.from(content.content, 'base64').toString('utf8').trim();
  if (!cachedAuthorization) throw new Error('Devin secret content is empty');
  return cachedAuthorization;
}
