import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
