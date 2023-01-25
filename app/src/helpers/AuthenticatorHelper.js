import { getUserAuth } from '../storage/AuthenticatorStorage';
import jwtDecode from 'jwt-decode';

const getToken = () => {
  const userAuth = getUserAuth();
  if (!userAuth) {
    return null;
  }
  const { accessToken } = userAuth;
  if (!accessToken) {
    return null;
  }
  return accessToken;
};

const getRefreshToken = async () => {
  const userAuth = await getUserAuth();
  if (!userAuth) {
    return null;
  }
  const { refreshToken } = userAuth;
  if (!refreshToken) {
    return null;
  }

  return refreshToken;
};

const getJwtDecode = (accessToken) => {
  if (accessToken) {
    return jwtDecode(accessToken);
  }
  return null;
};

const getPayload = async () => {
  const accessToken = await getToken();

  const user = getJwtDecode(accessToken);

  if (!user) {
    return null;
  }

  return user.payload || null;
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const { exp } = getJwtDecode(accessToken);

  if (!exp) {
    return false;
  }

  const expirationTime = exp * 1000;

  return expirationTime > new Date().getTime();
};

export { getToken, getJwtDecode, getPayload, getRefreshToken, isValidToken };
