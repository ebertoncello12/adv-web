import { ApiNoAuth } from '../Api/Config/axios.js';
import { removeUserAuth, setUserAuth } from '../storage/AuthenticatorStorage.js';

let loadingContext = null;

function setLoadingContext(context) {
  loadingContext = context;
}

async function login(username, password) {
  if (loadingContext) loadingContext.setIsLoading(true);

  try {
    const response = await ApiNoAuth.post('/auth/token', { username, password });
    const data = response.data;
    setUserAuth(JSON.stringify(data));
    window.location.href = '/home';
    return data;
  } catch (error) {
    throw error.response.data;
  } finally {
    if (loadingContext) loadingContext.setIsLoading(false);
  }
}

function logout() {
  removeUserAuth();
}

export { setLoadingContext, login, logout };
