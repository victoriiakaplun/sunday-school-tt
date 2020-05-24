import { loginUser, logoutUser } from '../../../service/TimetableAPI';
import { addNotification } from '../notification/notificationActions';
import { profileSucceed } from './profileActions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequested() {
  return {
    type: LOGIN_REQUEST,
  };
}
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED';
export function loginSucceed() {
  return {
    type: LOGIN_SUCCEED,
  };
}

export const LOGIN_ERROR = 'LOGIN_ERROR';
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

export const LOGOUT = 'LOGOUT';
export function logoutSucceed() {
  return {
    type: LOGOUT,
  };
}

export function login(body) {
  return dispatch => {
    dispatch(loginRequested());
    loginUser(body)
      .then(res => {
        dispatch(loginSucceed());
        dispatch(profileSucceed(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(loginError(error));
        dispatch(addNotification({ type: 'danger', message: 'Login failed!' }));
      });
  };
}

export function logout() {
  return dispatch => {
    logoutUser().then(() => {
      dispatch(logoutSucceed());
      dispatch(profileSucceed(null));
    });
  };
}
