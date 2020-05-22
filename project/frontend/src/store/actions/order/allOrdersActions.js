import { getAllOrders, updateOrder } from '../../../service/TimetableAPI';
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

export const UPDATED_ORDER = 'UPDATED_ORDER';
export function updatedOrder(order) {
  return {
    type: UPDATED_ORDER,
    payload: order,
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

export function update(body, id) {
  return dispatch => {
    updateOrder(body, id)
      .then(res => {
        dispatch(addNotification({ type: 'success', message: 'Order successfully updated' }));
        updatedOrder(res);
      })
      .catch(error => {
        dispatch(addNotification({ type: 'danger', message: 'Order updated failed' }));
      });
  };
}
