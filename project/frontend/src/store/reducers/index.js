import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer';
import timetableReducer from './timetableReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import registerReducer from './registerReducer';

const appReducer = combineReducers({
  notifications: notificationReducer,
  timetables: timetableReducer,
  authenticaion: authReducer,
  reg: registerReducer,
  profile: profileReducer,
});

export default appReducer;
