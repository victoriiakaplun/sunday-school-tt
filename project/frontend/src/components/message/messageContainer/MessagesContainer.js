import React from 'react';
import reactDOM from 'react-dom';
import classNames from 'classnames';
import MessagesList from '../MessagesList';
import styles from './MessageContainer.scss';

function MessageContainer({ show }) {
  if (!show) {
    return null;
  }
  const messagesRoot = document.getElementById('app');

  return reactDOM.createPortal(
    <div className={classNames(styles.container)}>
      Messages
      <MessagesList />
    </div>,
    messagesRoot,
  );
}

export default MessageContainer;
