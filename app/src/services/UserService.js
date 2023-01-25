import { isBusy } from '../store/loading/LoadingReducer';
import { addAlert } from '../store/messages/AlertReducer';
import { CodeAlertsMessage } from '../constants/CodeAlertsMessage';
import { instanceAxios } from './config/ApiConfigure';
import { builderQueryStringFilter } from '../helpers/QueryFilterHelper';
import { CodeSuccessMessage } from '../constants/CodeSuccessMessage';
import { CodeErrorMessage } from '../constants/CodeErrorMessage';

export const getAllUser = (querySearch) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      const queryString = builderQueryStringFilter(querySearch);
      const { data } = await instanceAxios.get(`/v1/admin/usuario?${queryString}`);
      return data;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_LOAD_USER,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const changeProfile = (id, requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.patch(`/v1/admin/usuario/${id}/perfil`, requestBody);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.USER_CHANGED,
        })
      );
      navigate('/usuario', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_LOAD_USER,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const addUser = (requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.post('/v1/admin/usuario', requestBody);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.USER_CREATED,
        })
      );
      navigate('/usuario', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_CREATE_USER,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const changePasswordUser = (requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.put('/v1/admin/usuario/troca-senha', requestBody);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.PASSWORD_CHANGED,
        })
      );
      navigate('/dashboard', { replace: true });
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

export const userDisable = (id) => {
  return async (dispatch) => {
    try {
      await instanceAxios.patch(`/v1/admin/usuario/${id}/bloqueio`);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.USER_DISABLED,
        })
      );
      return true;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_DISABLE_USER,
        })
      );
    }
    return false;
  };
};

export const userEnable = (id) => {
  return async (dispatch) => {
    try {
      await instanceAxios.patch(`/v1/admin/usuario/${id}/ativar`);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.USER_ENABLED,
        })
      );
      return true;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_ENABLE_USER,
        })
      );
    }
    return false;
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.delete(`/v1/admin/usuario/${id}`);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.USER_DELETE,
        })
      );
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_REMOVE_USER,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};
