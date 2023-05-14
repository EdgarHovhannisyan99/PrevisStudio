import axios from 'axios';
import Account from '../services/Account';

const { REACT_APP_API_URL } = process.env;
const testMode = localStorage.getItem('testMode');
const mode = localStorage.getItem('mode');

export const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use(
  config => {
    const token = Account.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.data = { ...config.data, testMode, mode };
    return config;
  },
  e => Promise.reject(e),
);
