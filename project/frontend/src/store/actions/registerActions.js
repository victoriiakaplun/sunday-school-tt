import { registerUser } from '../../service/TimetableAPI';
import { addNotification } from './notificationActions';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export function registerRequest() {
  return {
    type: REGISTER_REQUEST,
  };
}

export const REGISTER_SUCCEED = 'REGISTER_SUCCEED';
export function registerSucceed() {
  return {
    type: REGISTER_SUCCEED,
  };
}

export const REGISTER_ERROR = 'REGISTER_ERROR';
export function registerError(error) {
  return {
    type: REGISTER_ERROR,
    payload: error,
  };
}

export function register(body) {
  return dispatch => {
    dispatch(registerRequest());
    registerUser(body)
      .then(res => {
        dispatch(registerSucceed());
        return res.data;
      })
      .catch(error => {
        dispatch(registerError(error));
        dispatch(addNotification({ type: 'danger', message: 'Registration failed!' }));
      });
  };
}
