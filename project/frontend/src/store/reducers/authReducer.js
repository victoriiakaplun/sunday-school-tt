import { LOGIN_REQUEST, LOGIN_SUCCEED, LOGIN_ERROR, LOGOUT } from '../actions/authActions';

export function getInitialAuthState() {
  return {
    loading: true,
    error: null,
  };
}
function authReducer(prevState = getInitialAuthState(), recAction) {
  const handlerMap = {
    [LOGIN_REQUEST]: (state, action) => ({
      loading: true,
      error: null,
    }),
    [LOGIN_SUCCEED]: (state, action) => ({
      isAuth: true,
      error: null,
    }),
    [LOGIN_ERROR]: (state, action) => ({
      isAuth: false,
      error: action.payload,
    }),
    [LOGOUT]: (state, action) => ({
      loading: false,
      error: false,
    }),
  };

  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default authReducer;
