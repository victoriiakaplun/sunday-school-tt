import { addOrder, getTimetableOrders, updateOrder } from '../../../service/TimetableAPI';
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

export const UPDATED_ORDER = 'UPDATED_ORDER';
export function updatedOrder(order) {
  return {
    type: UPDATED_ORDER,
    payload: order,
  };
}

export const CREATED_ORDER = 'CREATED_ORDER';
export function createdOrder(order) {
  return {
    type: CREATED_ORDER,
    payload: order,
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

export function update(body, id) {
  return dispatch => {
    updateOrder(body, id)
      .then(res => {
        dispatch(addNotification({ type: 'success', message: 'Order successfully updated' }));
        dispatch(updatedOrder(res.data));
      })
      .catch(error => {
        dispatch(addNotification({ type: 'danger', message: 'Order updated failed' }));
      });
  };
}

export function createOrder(body) {
  return dispatch => {
    addOrder(body)
      .then(res => {
        dispatch(addNotification({ type: 'success', message: 'Order successfully created' }));
        dispatch(createdOrder(res.data));
      })
      .catch(error => {
        dispatch(addNotification({ type: 'danger', message: 'Order creation error' }));
      });
  };
}
