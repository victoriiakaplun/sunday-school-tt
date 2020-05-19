import {
  ORDER_CREATE_REQUESTED,
  ORDER_CREATE_ERROR,
  ORDER_CREATE_SUCCEED,
} from '../../actions/order/createOrderAction';

export function getInitialState() {
  return {
    order: null,
    loading: true,
    error: null,
  };
}

function createOrderCreationReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [ORDER_CREATE_REQUESTED]: (state, action) => ({
      order: null,
      loading: true,
      error: null,
    }),
    [ORDER_CREATE_SUCCEED]: (state, action) => ({
      order: action.payload,
      loading: false,
      error: null,
    }),
    [ORDER_CREATE_ERROR]: (state, action) => ({
      order: null,
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default createOrderCreationReducer;
