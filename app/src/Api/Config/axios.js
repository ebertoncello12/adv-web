import axios from 'axios';
import { refreshToken } from '../../services/AuthenticatorService.js';
import { getRefreshToken, getToken, isValidToken } from "../../helpers/AuthenticatorHelper.js";

const BASE_URL = 'https://api.advnote.com.br'
const X_API_KEY = 'a5b8ba5d-9efd-4043-80c9-e1af20859e25';

const ApiNoAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'X-Api-Key': X_API_KEY,
  },

});

const ApiAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'X-Api-Key': X_API_KEY,
  },
});

const instanceAxiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'X-Api-Key': X_API_KEY,
  },
});

ApiAuth.interceptors.request.use(
    async (config) => {
      const token = await getTokenOrRefresh();
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

instanceAxiosAuth.interceptors.request.use(
    async (config) => {
      const token = await getTokenOrRefresh();
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

const getTokenOrRefresh = async () => {
  let token = getToken();
  if (!isValidToken(token)) {
    token = await refreshToken({ refreshtoken: await getRefreshToken() });
  }
  return token;
};

export { ApiAuth, ApiNoAuth, instanceAxiosAuth };
