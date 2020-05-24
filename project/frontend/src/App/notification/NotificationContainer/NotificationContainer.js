import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reactDOM from 'react-dom';
import classNames from 'classnames';
import NotificationList from '../NotificationList';
import { removeNotification } from '../../../store/actions/notification/notificationActions';
import styles from './NotificationContainer.scss';

function NotificationContainer() {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);

  const notificationRoot = document.getElementById('app');
  function remove(id) {
    dispatch(removeNotification(id));
  }

  return reactDOM.createPortal(
    <div className={classNames(styles.container)}>
      <NotificationList notifications={notifications} onClose={remove} />
    </div>,
    notificationRoot,
  );
}

export default NotificationContainer;
