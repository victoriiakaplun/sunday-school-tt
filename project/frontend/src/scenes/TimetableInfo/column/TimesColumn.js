import React from 'react';
import TimetableColumn from './TimetableColumn';
import Cell from '../cell/Cell';

function TimesColumn() {
  const timesColumn = [-1, ...Array(24).keys()].map(timesItem => {
    if (timesItem === -1) {
      return <Cell key={timesItem} />;
    }
    return <Cell key={timesItem}>{`${timesItem}:00`}</Cell>;
  });

  return <TimetableColumn>{timesColumn}</TimetableColumn>;
}

export default TimesColumn;
