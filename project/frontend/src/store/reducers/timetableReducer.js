import {
  TIMETABLE_REQUESTED,
  TIMETABLE_LOADED,
  TIMETABLE_ERROR,
} from '../actions/timetableActions';
import { getInitialNotificationState } from './notificationReducer';

export function getInitialState() {
  return {
    timetables: [],
    loading: true,
    error: null,
  };
}

function timetableReducer(prevState, recAction) {
  const handlerMap = {
    [TIMETABLE_REQUESTED]: (state, action) => ({
      timetables: [],
      loading: true,
      error: null,
    }),
    [TIMETABLE_LOADED]: (state, action) => ({
      timetables: action.payload,
      loading: false,
      error: null,
    }),
    [TIMETABLE_ERROR]: (state, action) => ({
      timetables: [],
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : getInitialState();
}

export default timetableReducer;
