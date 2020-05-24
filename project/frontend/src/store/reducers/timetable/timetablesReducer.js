import {
  TIMETABLES_REQUESTED,
  TIMETABLES_LOADED,
  TIMETABLES_ERROR,
} from '../../actions/timetable/timetablesActions';

export function getInitialState() {
  return {
    timetables: [],
    loading: true,
    error: null,
  };
}

function timetablesReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [TIMETABLES_REQUESTED]: (state, action) => ({
      timetables: [],
      loading: true,
      error: null,
    }),
    [TIMETABLES_LOADED]: (state, action) => ({
      timetables: action.payload,
      loading: false,
      error: null,
    }),
    [TIMETABLES_ERROR]: (state, action) => ({
      timetables: [],
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default timetablesReducer;
