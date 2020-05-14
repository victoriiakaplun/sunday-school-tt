import { getProfile, update } from '../../service/TimetableAPI';
import { addNotification } from './notificationActions';

export const PROFILE_REQUESTED = 'PROFILE_REQUESTED';
export function profileRequested() {
  return {
    type: PROFILE_REQUESTED,
  };
}
export const PROFILE_SUCCEED = 'PROFILE_SUCCEED';
export function profileSucceed(profileData) {
  return {
    type: PROFILE_SUCCEED,
    payload: profileData,
  };
}
export const PROFILE_ERROR = 'PROFILE_ERROR';
export function profileError(error) {
  return {
    type: PROFILE_ERROR,
    payload: error,
  };
}

export function getUserProfile() {
  return dispatch => {
    dispatch(profileRequested());
    getProfile()
      .then(res => {
        dispatch(profileSucceed(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(profileError(error));
      });
  };
}

export function updateUserProfile(body, id) {
  return dispatch => {
    dispatch(profileRequested());
    update(body, id)
      .then(res => {
        dispatch(profileSucceed(res.data));
        dispatch(addNotification({ type: 'warning', message: 'Profile data was updated!' }));
        return res.data;
      })
      .catch(error => {
        dispatch(profileError(error));
        dispatch(addNotification({ type: 'danger', message: 'Update failed!' }));
      });
  };
}
