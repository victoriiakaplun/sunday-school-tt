import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer';

const appReducer = combineReducers({
  notifications: notificationReducer,
});

export default appReducer;
