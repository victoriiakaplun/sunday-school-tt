import { getTimetableOrders } from '../../../service/TimetableAPI';
import { addNotification } from '../notification/notificationActions';

export const TIMETABLE_ORDERS_REQUESTED = 'TIMETABLE_ORDERS_REQUESTED';
export function timetableOrdersRequested() {
  return {
    type: TIMETABLE_ORDERS_REQUESTED,
  };
}
export const TIMETABLE_ORDER_LOADED = 'TIMETABLE_ORDER_LOADED';
export function timetableOrdersLoaded(orders) {
  return {
    type: TIMETABLE_ORDER_LOADED,
    payload: orders,
  };
}

export const TIMETABLE_ORDER_ERROR = 'TIMETABLE_ORDER_ERROR';
export function timetableOrdersError(error) {
  return {
    type: TIMETABLE_ORDER_ERROR,
    payload: error,
  };
}

export function fetchTimetableOrders(timetableId) {
  return dispatch => {
    dispatch(timetableOrdersRequested());
    getTimetableOrders(timetableId)
      .then(res => {
        dispatch(timetableOrdersLoaded(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(timetableOrdersError(error));
        dispatch(addNotification({ type: 'danger', message: 'Error timetable orders loading' }));
      });
  };
}
