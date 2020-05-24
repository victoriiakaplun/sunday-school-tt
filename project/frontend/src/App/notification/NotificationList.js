import isEmpty from 'lodash/fp/isEmpty';
import React from 'react';
import Notification from './Notification/Notification';

function NotificationList({ notifications, onClose }) {
  if (isEmpty(notifications)) {
    return null;
  }
  return notifications.map(({ id, delay, type, message }) => (
    <Notification key={id} delay={delay} type={type} onClose={() => onClose(id)}>
      {message}
    </Notification>
  ));
}

export default NotificationList;
