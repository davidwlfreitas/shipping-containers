import { getJwtClaims } from './jwt';

function getSecureStorageKey(response: any, token?: string) {
  let secureStorageKey = null;
  if (response && response.config.method === 'get') {
    const claims = token ? getJwtClaims(token) : getJwtClaims(response.config.headers.Authorization);
    const accountId = claims && claims['https://company/account_id'] ? claims['https://company/account_id'] : null;
    secureStorageKey = `${accountId}.${response.config.baseURL}${response.config.url}.${JSON.stringify(
      response.config.params,
    )}`;
  }
  if (global.isDevEnv) console.log(`getSecureStorageKey: ${secureStorageKey}`);
  return secureStorageKey;
}

export { getSecureStorageKey };
