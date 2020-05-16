import { addNotification } from '../notification/notificationActions';
import { addTimetable } from '../../../service/TimetableAPI';

export const TIMETABLE_CREATE_REQUESTED = 'TIMETABLE_CREATE_REQUESTED';
export function timetableCreateRequested() {
  return {
    type: TIMETABLE_CREATE_REQUESTED,
  };
}
export const TIMETABLE_CREATE_SUCCEED = 'TIMETABLE_CREATE_SUCCEED';
export function timetablesCreateSucceed(timetable) {
  return {
    type: TIMETABLE_CREATE_SUCCEED,
    payload: timetable,
  };
}

export const TIMETABLE_CREATE_ERROR = 'TIMETABLE_CREATE_ERROR';
export function timetablesCreateError(error) {
  return {
    type: TIMETABLE_CREATE_ERROR,
    payload: error,
  };
}

export function createTimetable(body) {
  return dispatch => {
    dispatch(timetableCreateRequested());
    addTimetable(body)
      .then(res => {
        dispatch(addNotification({ type: 'success', message: 'Timetable successfully created' }));
        dispatch(timetablesCreateSucceed(res.data));
      })
      .catch(error => {
        dispatch(addNotification({ type: 'danger', message: 'Timetable creation error' }));
        dispatch(timetablesCreateError(error));
      });
  };
}
