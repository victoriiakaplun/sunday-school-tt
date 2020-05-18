import React from 'react';
import classNames from 'classnames';
import styles from './TimetableInfo.scss';

function TimetableContainer({ children }) {
  return <div className={classNames('columns', styles.container)}>{children}</div>;
}

export default TimetableContainer;
