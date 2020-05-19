import { addNotification } from '../notification/notificationActions';
import { getUserOrders } from '../../../service/TimetableAPI';

export const USER_ORDERS_REQUESTED = 'USER_ORDERS_REQUESTED';
export function userOrdersRequested() {
  return {
    type: USER_ORDERS_REQUESTED,
  };
}
export const USER_ORDERS_SUCCEED = 'USER_ORDERS_SUCCEED';
export function userOrdersSucceed(userOrders) {
  return {
    type: USER_ORDERS_SUCCEED,
    payload: userOrders,
  };
}
export const USER_ORDERS_ERROR = 'USER_ORDERS_ERROR';
export function userOrdersError(error) {
  return {
    type: USER_ORDERS_ERROR,
    payload: error,
  };
}

export function fetchUserOrders(id) {
  return dispatch => {
    dispatch(userOrdersRequested());
    getUserOrders(id)
      .then(res => {
        dispatch(userOrdersSucceed(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(userOrdersError(error));
        dispatch(addNotification({ type: 'danger', message: 'Orders loading error' }));
      });
  };
}
