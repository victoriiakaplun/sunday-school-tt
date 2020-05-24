import { getUserMessages, updateMessage } from '../../../service/TimetableAPI';
import { addNotification } from '../notification/notificationActions';

export const MESSAGES_REQUESTED = 'MESSAGES_REQUESTED';
export function messagesRequested() {
  return {
    type: MESSAGES_REQUESTED,
  };
}
export const MESSAGES_LOADED = 'MESSAGES_LOADED';
export function messagesLoaded(messages) {
  return {
    type: MESSAGES_LOADED,
    payload: messages,
  };
}

export const MESSAGES_ERROR = 'MESSAGES_ERROR';
export function messagesError(error) {
  return {
    type: MESSAGES_ERROR,
    payload: error,
  };
}

export const UPDATED_MESSAGE = 'UPDATED MESSAGE';
export function updatedMessage(message) {
  return {
    type: UPDATED_MESSAGE,
    payload: message,
  };
}

export function fetchMessages(userId) {
  return dispatch => {
    dispatch(messagesRequested());
    getUserMessages(userId)
      .then(res => {
        dispatch(messagesLoaded(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(messagesError(error));
      });
  };
}

export function updateUserMessage(body, messageId) {
  return dispatch => {
    updateMessage(body, messageId)
      .then(res => {
        dispatch(addNotification({ type: 'success', message: 'Message status updated succeed!' }));
        dispatch(updatedMessage(res.data));
        return res;
      })
      .catch(error => {
        dispatch(addNotification({ type: 'danger', message: 'Message status updated failed!' }));
      });
  };
}
