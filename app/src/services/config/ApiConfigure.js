import axios from 'axios';
import {
  getRefreshToken,
  getToken,
  isValidToken,
} from '../../helpers/AuthenticatorHelper';
import { CodeErrorMessage } from '../../constants/CodeErrorMessage';
import { removeUserAuth } from '../../storage/AuthenticatorStorage';
import { refreshToken } from '../AuthenticatorService';

const responseErrorLogout = (redirectLogin) => {
  removeUserAuth();
  if (redirectLogin) {
    window.location.href = '/login';
  }
  return Promise.reject({
    response: {
      status: 401,
      data: {},
    },
  });
};

const getResponseErrorMessage = (error, redirectLogin) => {
  if (error && error.message === 'Network Error') {
    return Promise.reject(CodeErrorMessage.NETWORK_ERROR);
  }

  if (error && error.message && error.message.includes('timeout of')) {
    return Promise.reject(CodeErrorMessage.TIMEOUT);
  }

  if (error && !error.response) {
    return Promise.reject(CodeErrorMessage.INTERNAL_SERVER_ERROR);
  }

  if (
    error.response.status === 401 &&
    error.config.url === '/v1/autenticacao/renova-token'
  ) {
    return responseErrorLogout(true);
  }

  if (error.response.status === 403) {
    window.location.href = '/403';
    return Promise.reject('Acesso Negado');
  }

  if (error.response.status === 500) {
    return Promise.reject(CodeErrorMessage.INTERNAL_SERVER_ERROR);
  }
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.errors.length > 0
  ) {
    const errorMessage = error.response.data.errors[0].message;
    return Promise.reject(errorMessage);
  }

  return responseErrorLogout(redirectLogin);
};

const instanceAxiosAuth = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'X-Api-Key': import.meta.env.VITE_APP_X_API_KEY,
  },
  timeout: 10 * 1000,
});

instanceAxiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    return getResponseErrorMessage(error, false);
  }
);

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'X-Api-Key': import.meta.env.VITE_APP_X_API_KEY,
  },
  timeout: 15 * 1000,
});

instanceAxios.interceptors.request.use(
  async (config) => {
    let token = getToken();
    if (!isValidToken(token)) {
      token = await refreshToken({
        tokenRenovado: await getRefreshToken(),
      });
    }

    if (token && token.length > 0) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return getResponseErrorMessage(error, true);
  }
);

export { instanceAxios, instanceAxiosAuth };
