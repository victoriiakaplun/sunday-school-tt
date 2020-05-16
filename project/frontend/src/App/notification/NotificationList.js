import isEmpty from 'lodash/fp/isEmpty';
import React from 'react';
import reactDOM from 'react-dom';
import Notification from './Notification';

const notificationRoot = document.getElementById('app');

function NotificationList({ notifications, onClose }) {
  if (isEmpty(notifications)) {
    return null;
  }
  return reactDOM.createPortal(
    <>
      {notifications.map(({ id, delay, type, message }) => (
        <Notification key={id} delay={delay} type={type} onClose={() => onClose(id)}>
          {message}
        </Notification>
      ))}
    </>,
    notificationRoot,
  );
}

export default NotificationList;
