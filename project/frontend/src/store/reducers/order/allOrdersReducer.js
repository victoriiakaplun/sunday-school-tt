import {
  ORDERS_REQUESTED,
  ORDERS_LOADED,
  ORDERS_ERROR,
  UPDATED_ORDER,
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
    [UPDATED_ORDER]: (state, action) => {
      const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
      const copy = state.orders.slice();
      copy[orderIndex] = action.payload;
      return {
        ...state,
        orders: copy,
      };
    },
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default allOrdersReducer;
