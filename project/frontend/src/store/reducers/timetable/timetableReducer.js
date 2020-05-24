import {
  TIMETABLE_REQUESTED,
  TIMETABLE_LOADED,
  TIMETABLE_ERROR,
} from '../../actions/timetable/timetableActions';

export function getInitialState() {
  return {
    timetable: null,
    loading: true,
    error: null,
  };
}

function timetableReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [TIMETABLE_REQUESTED]: (state, action) => ({
      timetable: null,
      loading: true,
      error: null,
    }),
    [TIMETABLE_LOADED]: (state, action) => ({
      timetable: action.payload,
      loading: false,
      error: null,
    }),
    [TIMETABLE_ERROR]: (state, action) => ({
      timetable: null,
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default timetableReducer;
