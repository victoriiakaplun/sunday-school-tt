import React, { useEffect } from 'react';
import classNames from 'classnames';
import CloseButton from '../../../components/button/CloseButton';

import styles from './Notification.scss';

function Notification({ onClose, delay, type, children }) {
  useEffect(() => {
    setTimeout(() => onClose(), delay);
  }, [onClose, delay]);

  const containerClasses = classNames(styles.container, 'notification', `is-${type}`);

  return (
    <div className={containerClasses}>
      <CloseButton onClose={onClose} />
      {children}
    </div>
  );
}

Notification.defaultProps = {
  delay: 10000,
};

export default Notification;
