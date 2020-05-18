import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Header from '../../components/header/Header';
import TimetableDetailsBox from './TimetableDetailsBox';
import styles from './TimetableInfo.scss';
import TimetableCell from './TimetableCell';
import TimetableContainer from './TimetableContainer';
import TimetableDayColumn from './TimetableDayColumn';
import TimesColumn from './TimesColumn';

const moment = require('moment');

function TimetableInfo({ timetables }) {
  const { id } = useParams();
  const parsedId = Number.parseInt(id, 10);
  const timetable = timetables.find(t => t.id === parsedId);
  const { title, start, end, slotSize, Slot, Attribute } = timetable;

  const array = [...Array(25).keys()].map(item => {
    return <TimetableCell key={item} attributes={timetable.Attribute} />;
  });

  return (
    <div>
      <Header>Timetable details</Header>
      <TimetableDetailsBox info={{ title, start, end, slotSize, Attribute }} />
      <TimetableContainer>
        <TimesColumn />
        <TimetableDayColumn>{array}</TimetableDayColumn>
        <TimetableDayColumn>{array}</TimetableDayColumn>
        <TimetableDayColumn>{array}</TimetableDayColumn>
        <TimetableDayColumn>{array}</TimetableDayColumn>
        <TimetableDayColumn>{array}</TimetableDayColumn>
        <TimetableDayColumn>{array}</TimetableDayColumn>
        <TimetableDayColumn>{array}</TimetableDayColumn>
      </TimetableContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  timetables: state.timetables.timetables,
  loading: state.timetables.loading,
  error: state.timetables.error,
});
export default connect(mapStateToProps)(TimetableInfo);
