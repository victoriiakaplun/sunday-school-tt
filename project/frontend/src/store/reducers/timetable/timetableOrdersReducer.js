import {
  TIMETABLE_ORDERS_REQUESTED,
  TIMETABLE_ORDER_LOADED,
  TIMETABLE_ORDER_ERROR,
} from '../../actions/timetable/timetableOrdersActions';

export function getInitialState() {
  return {
    timetableOrders: [],
    loading: true,
    error: null,
  };
}

function timetableOrdersReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [TIMETABLE_ORDERS_REQUESTED]: (state, action) => ({
      timetableOrders: [],
      loading: true,
      error: null,
    }),
    [TIMETABLE_ORDER_LOADED]: (state, action) => ({
      timetableOrders: action.payload,
      loading: false,
      error: null,
    }),
    [TIMETABLE_ORDER_ERROR]: (state, action) => ({
      timetableOrders: [],
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default timetableOrdersReducer;
