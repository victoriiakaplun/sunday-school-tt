import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import CloseButton from '../../App/notification/CloseButton';

import styles from './MessageCard.scss';

function MessageCard({ messageType, timetableTitle, id, period, onClose }) {
  return (
    <div className={classNames(styles.container)}>
      <CloseButton onClose={onClose} />
      <b>{messageType}</b>
      <Link to={`/timetables/${id}`}>{timetableTitle}</Link>
      {period}
    </div>
  );
}

export default MessageCard;
