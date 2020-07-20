import axios from 'axios';
import jwtMiddleware from './middleware/jwt';
import errorMiddleware from './middleware/errorHandling';
import cacheMiddleware from './middleware/cacheMiddleware';
import { SecureStorage } from 'nativescript-secure-storage';

const secureStorage = new SecureStorage();

const api = axios.create({
  baseURL: global.apiUrlRest,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => jwtMiddleware(config),
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (config) => cacheMiddleware(config, secureStorage),
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => errorMiddleware(error, secureStorage),
);

export const http = api;
