import store from '@/store';
import { AxiosRequestConfig } from 'axios';

const middleware = (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  if (config.headers.Authorization) {
    return Promise.resolve(config);
  }

  return new Promise(async (resolve, reject) => {
    let token = (store.state as any).AUTH.jwt;

    if (global.isDevEnv) {
      console.log('Current Token: ', token);
    }

    if (token) config.headers.Authorization = `Bearer ${token}`;
    resolve(config);
  });
};

export default middleware;
