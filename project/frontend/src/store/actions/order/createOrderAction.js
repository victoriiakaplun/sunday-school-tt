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
