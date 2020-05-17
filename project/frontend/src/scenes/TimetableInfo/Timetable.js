import React from 'react';
import './Timetable.scss';
import TimetableCeil from './TimetableCell';

function Timetable() {
  return <div>{Array(24).fill(<TimetableCeil />)}</div>;
}
export default Timetable;
