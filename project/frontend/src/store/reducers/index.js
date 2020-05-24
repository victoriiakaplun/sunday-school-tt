import { combineReducers } from 'redux';
import notificationReducer from './notification/notificationReducer';
import timetablesReducer from './timetable/timetablesReducer';
import authReducer from './user/authReducer';
import profileReducer from './user/profileReducer';
import registerReducer from './user/registerReducer';
import createTimetableReducer from './timetable/createTimetableReducer';
import createOrderCreationReducer from './order/createOrderReducer';
import userOrdersReducer from './user/userOrdersReducer';
import timetableOrdersReducer from './timetable/timetableOrdersReducer';
import allOrdersReducer from './order/allOrdersReducer';
import userMessagesReducer from './user/userMessagesReducer';
import timetableReducer from './timetable/timetableReducer';

const appReducer = combineReducers({
  notifications: notificationReducer,
  timetables: timetablesReducer,
  authenticaion: authReducer,
  timetableCreation: createTimetableReducer,
  reg: registerReducer,
  profile: profileReducer,
  orderCreation: createOrderCreationReducer,
  userOrders: userOrdersReducer,
  timetableOrders: timetableOrdersReducer,
  orders: allOrdersReducer,
  messages: userMessagesReducer,
  timetable: timetableReducer,
});

export default appReducer;
