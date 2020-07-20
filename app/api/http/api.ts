import { http } from './index';
import axios from 'axios';
import store from '@/store';

const boxTechApi = {
  getUser: (data: any, token: string) => {
    const headers = {
      ContentType: 'application/x-www-form-urlencoded',
      Authorization: `Basic ${token}`,
    };
  
    return axios.post(`${http.defaults.baseURL}/oauth/token`, data, {
      headers: headers,
    });
  },
  getContainerInfo: (data: any) => {
    const token = (store.state as any).AUTH.jwt;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.get(`${http.defaults.baseURL}/api/v2.0/container/${data}`, {
      headers: headers,
    });
  },
};

export { boxTechApi };
