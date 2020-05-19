import { addNotification } from '../notification/notificationActions';
import { addOrder } from '../../../service/TimetableAPI';

export const ORDER_CREATE_REQUESTED = 'ORDER_CREATE_REQUESTED';
export function orderCreateRequested() {
  return {
    type: ORDER_CREATE_REQUESTED,
  };
}
export const ORDER_CREATE_SUCCEED = 'ORDER_CREATE_SUCCEED';
export function orderCreateSucceed(order) {
  return {
    type: ORDER_CREATE_SUCCEED,
    payload: order,
  };
}

export const ORDER_CREATE_ERROR = 'ORDER_CREATE_ERROR';
export function orderCreateError(error) {
  return {
    type: ORDER_CREATE_ERROR,
    payload: error,
  };
}

export function createOrder(body) {
  return dispatch => {
    dispatch(orderCreateRequested());
    addOrder(body)
      .then(res => {
        dispatch(addNotification({ type: 'success', message: 'Order successfully created' }));
        dispatch(orderCreateSucceed(res.data));
      })
      .catch(error => {
        dispatch(addNotification({ type: 'danger', message: 'Order creation error' }));
        dispatch(orderCreateError(error));
      });
  };
}
