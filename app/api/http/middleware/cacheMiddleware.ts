import { getSecureStorageKey } from '@/api/utils/cache';
import { AxiosResponse } from 'axios';
import { SecureStorage } from 'nativescript-secure-storage';

const cacheMiddleware = (response: AxiosResponse, secureStorage: SecureStorage): Promise<AxiosResponse> => {
  return new Promise(async (resolve, reject) => {
    const secureStorageKey = getSecureStorageKey(response);
    console.log('REPONSE => ', response)
    if (secureStorageKey) {
      await secureStorage.set({
        key: secureStorageKey,
        value: JSON.stringify(response),
      });
    }
    resolve(response);
  });
};

export default cacheMiddleware;
