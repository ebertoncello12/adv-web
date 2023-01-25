import { addAlert } from '../store/messages/AlertReducer';
import { CodeAlertsMessage } from '../constants/CodeAlertsMessage';
import { instanceAxios } from './config/ApiConfigure';
import { CodeErrorMessage } from '../constants/CodeErrorMessage';

export const getProfile = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceAxios.get('/v1/admin/usuario/perfil');
      return data || [];
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.FAILED_LOAD_PROFILE,
        })
      );
    }
  };
};
