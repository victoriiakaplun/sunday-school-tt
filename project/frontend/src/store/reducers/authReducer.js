import { LOGIN_REQUEST, LOGIN_SUCCEED, LOGIN_ERROR, LOGOUT } from '../actions/authActions';

export function getInitialAuthState() {
  return {
    isAuth: false,
    loading: true,
    error: null,
  };
}
function authReducer(prevState, recAction) {
  const handlerMap = {
    [LOGIN_REQUEST]: (state, action) => ({
      isAuth: false,
      loading: true,
      error: null,
    }),
    [LOGIN_SUCCEED]: (state, action) => ({
      loading: false,
      isAuth: true,
      error: null,
    }),
    [LOGIN_ERROR]: (state, action) => ({
      loading: false,
      isAuth: false,
      error: action.payload,
    }),
    [LOGOUT]: (state, action) => ({
      isAuth: false,
      loading: false,
      error: false,
    }),
  };

  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : getInitialAuthState();
}

export default authReducer;
