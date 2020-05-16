import { combineReducers } from 'redux';
import notificationReducer from './notification/notificationReducer';
import timetableReducer from './timetable/timetableReducer';
import authReducer from './user/authReducer';
import profileReducer from './user/profileReducer';
import registerReducer from './user/registerReducer';
import createTimetableReducer from './timetable/createTimetableReducer';

const appReducer = combineReducers({
  notifications: notificationReducer,
  timetables: timetableReducer,
  authenticaion: authReducer,
  timetableCreation: createTimetableReducer,
  reg: registerReducer,
  profile: profileReducer,
});

export default appReducer;
