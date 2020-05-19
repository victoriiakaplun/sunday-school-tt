import { combineReducers } from 'redux';
import notificationReducer from './notification/notificationReducer';
import timetableReducer from './timetable/timetableReducer';
import authReducer from './user/authReducer';
import profileReducer from './user/profileReducer';
import registerReducer from './user/registerReducer';
import createTimetableReducer from './timetable/createTimetableReducer';
import createOrderCreationReducer from './order/createOrderReducer';
import userOrdersReducer from './user/userOrdersReducer';

const appReducer = combineReducers({
  notifications: notificationReducer,
  timetables: timetableReducer,
  authenticaion: authReducer,
  timetableCreation: createTimetableReducer,
  reg: registerReducer,
  profile: profileReducer,
  orderCreation: createOrderCreationReducer,
  userOrders: userOrdersReducer,
});

export default appReducer;
