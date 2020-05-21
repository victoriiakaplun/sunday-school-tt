import React from 'react';
import classNames from 'classnames';
import styles from './CardHeader.scss';

function CardHeader({ children, type }) {
  let headerStyle = '';
  let headerTitleStyle = '';
  if (type === 'noRequests') {
    headerStyle = styles.noRequests;
    headerTitleStyle = styles.white;
  }
  if (type === 'awaiting') {
    headerStyle = styles.awaiting;
    headerTitleStyle = styles.white;
  }
  return (
    <h5 className={classNames('card-header', headerStyle)}>
      <p className={classNames('card-header-title', headerTitleStyle)}>{children}</p>
    </h5>
  );
}

export default CardHeader;
