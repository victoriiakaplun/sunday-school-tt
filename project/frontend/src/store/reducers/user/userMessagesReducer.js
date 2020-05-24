import {
  MESSAGES_REQUESTED,
  MESSAGES_LOADED,
  MESSAGES_ERROR,
  UPDATED_MESSAGE,
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
    [UPDATED_MESSAGE]: (state, action) => {
      const messagesCopy = state.messages.slice();
      const updatedIndex = state.messages.findIndex(order => order.id === action.payload.id);
      messagesCopy[updatedIndex] = action.payload;
      return {
        ...state,
        messages: messagesCopy,
      };
    },
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : prevState;
}

export default userMessagesReducer;
