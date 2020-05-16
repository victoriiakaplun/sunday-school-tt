import {
  REGISTER_REQUEST,
  REGISTER_SUCCEED,
  REGISTER_ERROR,
} from '../../actions/user/registerActions';

export function getInitialState() {
  return {
    isRegistered: false,
    loading: true,
    error: null,
  };
}
function authReducer(prevState, recAction) {
  const handlerMap = {
    [REGISTER_REQUEST]: (state, action) => ({
      isRegistered: false,
      loading: true,
      error: null,
    }),
    [REGISTER_SUCCEED]: (state, action) => ({
      isRegistered: true,
      loading: false,
      error: null,
    }),
    [REGISTER_ERROR]: (state, action) => ({
      isRegistered: false,
      loading: false,
      error: action.payload,
    }),
  };

  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : getInitialState();
}

export default authReducer;
