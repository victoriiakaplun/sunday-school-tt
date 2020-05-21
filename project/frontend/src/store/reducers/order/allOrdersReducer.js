import {
  ORDERS_REQUESTED,
  ORDERS_LOADED,
  ORDERS_ERROR,
} from '../../actions/order/allOrdersActions';

export function getInitialState() {
  return {
    orders: [],
    loading: true,
    error: null,
  };
}

function allOrdersReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [ORDERS_REQUESTED]: (state, action) => ({
      orders: [],
      loading: true,
      error: null,
    }),
    [ORDERS_LOADED]: (state, action) => ({
      orders: action.payload,
      loading: false,
      error: null,
    }),
    [ORDERS_ERROR]: (state, action) => ({
      orders: [],
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default allOrdersReducer;
