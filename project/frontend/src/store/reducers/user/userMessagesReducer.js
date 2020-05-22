import {
  MESSAGES_REQUESTED,
  MESSAGES_LOADED,
  MESSAGES_ERROR,
} from '../../actions/user/userMessagesActions';

export function getInitialState() {
  return {
    messages: [],
    loading: true,
    error: null,
  };
}

function userMessagesReducer(prevState = getInitialState(), recAction) {
  const handlerMap = {
    [MESSAGES_REQUESTED]: (state, action) => ({
      messages: [],
      loading: true,
      error: null,
    }),
    [MESSAGES_LOADED]: (state, action) => ({
      messages: action.payload,
      loading: false,
      error: null,
    }),
    [MESSAGES_ERROR]: (state, action) => ({
      messages: [],
      loading: false,
      error: action.payload,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default userMessagesReducer;
