import { getSecureStorageKey } from '@/api/utils/cache';
import store from '@/store';
import FeedbackNotification from '@/utils/FeedbackNotification';
import { AxiosError } from 'axios';
import { SecureStorage } from 'nativescript-secure-storage';
import FirebaseAnalytics from '@/utils/FirebaseAnalytics';

const errorMiddleware = (error: AxiosError, secureStorage: SecureStorage): Promise<AxiosError> => {
  return new Promise(async (resolve, reject) => {
    const AUTH_CREDENTIALS = await secureStorage.get({
      key: 'AUTH_CREDENTIALS',
    });

    const orgJwt = await secureStorage.get({
      key: 'orgJwt',
    });

    const jwt = JSON.parse(AUTH_CREDENTIALS).accessToken;

    const token = orgJwt ? orgJwt : jwt;

    const hasConnection = store ? (store.state as any).CORE.hasConnection : null;
    if (!hasConnection) {
      FeedbackNotification.showNoConnection();
      const secureStorageKey = getSecureStorageKey(error, token);
      let response = null;
      if (secureStorageKey) {
        response = JSON.parse(
          await secureStorage.get({
            key: secureStorageKey,
          }),
        );
        if (response) resolve(response);
      }
    }
    FirebaseAnalytics.sendCrashLog(error);
    reject(error);
  });
};

export default errorMiddleware;
