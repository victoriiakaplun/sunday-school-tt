import { getAllTimetables } from '../../../service/TimetableAPI';
import { addNotification } from '../notification/notificationActions';

export const TIMETABLES_REQUESTED = 'TIMETABLES_REQUEST';
export function timetablesRequested() {
  return {
    type: TIMETABLES_REQUESTED,
  };
}
export const TIMETABLES_LOADED = 'TIMETABLES_LOADED';
export function timetablesLoaded(timetables) {
  return {
    type: TIMETABLES_LOADED,
    payload: timetables,
  };
}

export const TIMETABLES_ERROR = 'TIMETABLES_ERROR';
export function timetablesError(error) {
  return {
    type: TIMETABLES_ERROR,
    payload: error,
  };
}

export function fetchTimetables() {
  return dispatch => {
    dispatch(timetablesRequested());
    getAllTimetables()
      .then(res => {
        dispatch(timetablesLoaded(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(timetablesError(error));
        dispatch(addNotification({ type: 'danger', message: 'Error timetable loading' }));
      });
  };
}
