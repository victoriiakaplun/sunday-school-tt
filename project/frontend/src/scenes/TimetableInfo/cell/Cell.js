import React from 'react';
import classNames from 'classnames';
import timeColumnStyles from '../TimetableInfo.scss';

function Cell({ children }) {
  return <div className={classNames(timeColumnStyles.cell)}>{children}</div>;
}

export default Cell;
