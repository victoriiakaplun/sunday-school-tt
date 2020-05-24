import { getTimetable } from '../../../service/TimetableAPI';
import { addNotification } from '../notification/notificationActions';

export const TIMETABLE_REQUESTED = 'TIMETABLE_REQUEST';
export function timetableRequested() {
  return {
    type: TIMETABLE_REQUESTED,
  };
}
export const TIMETABLE_LOADED = 'TIMETABLE_LOADED';
export function timetableLoaded(timetable) {
  return {
    type: TIMETABLE_LOADED,
    payload: timetable,
  };
}

export const TIMETABLE_ERROR = 'TIMETABLES_ERROR';
export function timetableError(error) {
  return {
    type: TIMETABLE_ERROR,
    payload: error,
  };
}

export function fetchTimetable(timetableId) {
  return dispatch => {
    dispatch(timetableRequested());
    getTimetable(timetableId)
      .then(res => {
        dispatch(timetableLoaded(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(timetableError(error));
        dispatch(addNotification({ type: 'danger', message: 'Error timetable loading' }));
      });
  };
}
