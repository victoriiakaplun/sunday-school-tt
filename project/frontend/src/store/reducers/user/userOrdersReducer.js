import {
  USER_ORDERS_REQUESTED,
  USER_ORDERS_SUCCEED,
  USER_ORDERS_ERROR,
} from '../../actions/user/userOrdersActions';

export function getInitialState() {
  return {
    userOrders: [],
    loading: false,
    error: false,
  };
}

function userOrdersReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [USER_ORDERS_REQUESTED]: (state, action) => ({
      userOrders: [],
      error: false,
      loading: true,
    }),
    [USER_ORDERS_SUCCEED]: (state, action) => ({
      userOrders: action.payload,
      error: false,
      loading: false,
    }),
    [USER_ORDERS_ERROR]: (state, action) => ({
      userOrders: [],
      error: action.payload,
      loading: false,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default userOrdersReducer;
