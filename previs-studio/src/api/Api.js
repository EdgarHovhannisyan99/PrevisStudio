import axios from 'axios';
import Account from '../services/Account';

const { REACT_APP_API_URL } = process.env;

export const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use(
  config => {
    const token = Account.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.data = { ...config.data };
    return config;
  },
  e => Promise.reject(e),
);
