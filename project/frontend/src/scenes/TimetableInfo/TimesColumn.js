import React from 'react';
import styles from './TimetableInfo.scss';
import TimetableDayColumn from './TimetableDayColumn';

function TimesColumn() {
  const timesColumn = [-1, ...Array(24).keys()].map(timesItem => {
    if (timesItem === -1) {
      return <div key={timesItem} className={styles.cell} />;
    }
    return <div key={timesItem} className={styles.cell}>{`${timesItem}:00`}</div>;
  });

  return <TimetableDayColumn>{timesColumn}</TimetableDayColumn>;
}

export default TimesColumn;
