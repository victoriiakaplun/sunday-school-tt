import React from 'react';
import classNames from 'classnames';
import styles from '../TimetableInfo.scss';

function TimetableColumn({ children }) {
  return <div className={classNames('column', 'is-1', styles.tableColumn)}>{children}</div>;
}

export default TimetableColumn;
