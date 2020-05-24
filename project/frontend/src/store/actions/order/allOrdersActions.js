import { getAllOrders } from '../../../service/TimetableAPI';
import { addNotification } from '../notification/notificationActions';

export const ORDERS_REQUESTED = 'ORDERS_REQUESTED';
export function ordersRequested() {
  return {
    type: ORDERS_REQUESTED,
  };
}
export const ORDERS_LOADED = 'ORDERS_LOADED';
export function ordersLoaded(orders) {
  return {
    type: ORDERS_LOADED,
    payload: orders,
  };
}

export const ORDERS_ERROR = 'ORDERS_ERROR';
export function ordersError(error) {
  return {
    type: ORDERS_ERROR,
    payload: error,
  };
}

export function fetchOrders() {
  return dispatch => {
    dispatch(ordersRequested());
    getAllOrders()
      .then(res => {
        dispatch(ordersLoaded(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(ordersError(error));
        dispatch(addNotification({ type: 'danger', message: 'Error timetable loading' }));
      });
  };
}
