import { getAllTimetables } from '../../service/TimetableAPI';
import { addNotification } from './notificationActions';

export const TIMETABLE_REQUESTED = 'TIMETABLE_REQUEST';
export function timetableRequested() {
  return {
    type: TIMETABLE_REQUESTED,
  };
}
export const TIMETABLE_LOADED = 'TIMETABLE_LOADED';
export function timetablesLoaded(timetables) {
  return {
    type: TIMETABLE_LOADED,
    payload: timetables,
  };
}

export const TIMETABLE_ERROR = 'TIMETABLE_ERROR';
export function timetablesError(error) {
  return {
    type: TIMETABLE_ERROR,
    payload: error,
  };
}

export function fetchTimetables() {
  return dispatch => {
    dispatch(timetableRequested());
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
