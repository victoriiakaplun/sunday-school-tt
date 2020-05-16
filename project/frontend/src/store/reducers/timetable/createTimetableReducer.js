import {
  TIMETABLE_CREATE_REQUESTED,
  TIMETABLE_CREATE_ERROR,
  TIMETABLE_CREATE_SUCCEED,
} from '../../actions/timetable/createTimetableActions';

export function getInitialState() {
  return {
    timetable: null,
    loading: true,
    error: null,
  };
}

function createTimetableReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [TIMETABLE_CREATE_REQUESTED]: (state, action) => ({
      timetable: null,
      loading: true,
      error: null,
    }),
    [TIMETABLE_CREATE_SUCCEED]: (state, action) => ({
      timetable: action.payload,
      loading: false,
      error: null,
    }),
    [TIMETABLE_CREATE_ERROR]: (state, action) => ({
      timetables: null,
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default createTimetableReducer;
