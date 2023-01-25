import { removeUserAuth, setUserAuth } from '../storage/AuthenticatorStorage';
import { addAlert } from '../store/messages/AlertReducer';
import { isBusy } from '../store/loading/LoadingReducer';
import { CodeAlertsMessage } from '../constants/CodeAlertsMessage';
import { loggedInUser } from '../store/user/UserReducer';
import { instanceAxiosAuth } from './config/ApiConfigure';
import { CodeErrorMessage } from '../constants/CodeErrorMessage';
import { CodeSuccessMessage } from '../constants/CodeSuccessMessage';
import { getToken } from '../helpers/AuthenticatorHelper';

export const signIn = (requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      const { data } = await instanceAxiosAuth.post(
        '/v1/autenticacao/token',
        requestBody
      );
      dispatch(loggedInUser(data));
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.USER_LOGGED,
        })
      );
      navigate('/dashboard', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.UNAUTHORIZED,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const refreshToken = async (token) => {
  const { data } = await instanceAxiosAuth.post('/v1/autenticacao/renova-token', {
    tokenRenovado: token.tokenRenovado,
  });
  await setUserAuth(JSON.stringify(data));
  return await getToken();
};

export const firstAccess = (requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxiosAuth.put('/v1/autenticacao/primeiro-acesso', requestBody);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.PASSWORD_CREATED,
        })
      );
      navigate('/login', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_FIRST_ACCESS,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const changeRecoverPassword = (requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxiosAuth.put('/v1/autenticacao/recupera-senha', requestBody);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.PASSWORD_CHANGED,
        })
      );
      navigate('/login', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_CHANGE_PASSWORD,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const recoverPassword = (requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxiosAuth.post('/v1/autenticacao/recupera-senha', requestBody);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.REQUEST_EMAIL_BOX_SENT,
        })
      );
      if (navigate) {
        navigate('/login', { replace: true });
      }
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_REQUEST_CHANGE_PASSWORD,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const signOut = () => {
  removeUserAuth();
  return (dispatch) => {
    dispatch(loggedInUser(null));
  };
};
