import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Header from '../../components/header/Header';
import TimetableDetailsBox from './TimetableDetailsBox';

import timeColumnStyles from './TimesColumn.scss';
import TimetableCell from './TimetableCell';

function TimetableInfo({ timetables }) {
  const { id } = useParams();
  const parsedId = Number.parseInt(id, 10);
  const timetable = timetables.find(t => t.id === parsedId);
  const { title, start, end, slotSize, Attribute } = timetable;

  const timesColumn = [-1, ...Array(24).keys()].map(timesItem => {
    if (timesItem === -1) {
      return <div key={timesItem} className={timeColumnStyles.cell} />;
    }

    return <div key={timesItem} className={timeColumnStyles.cell}>{`${timesItem}:00`}</div>;
  });

  const array = [...Array(24).keys()].map(item => {
    return <TimetableCell key={item} attributes={timetable.Attribute} />;
  });

  return (
    <div className={timeColumnStyles.container}>
      <Header>Timetable details</Header>
      <TimetableDetailsBox info={{ title, start, end, slotSize, Attribute }} />
      <div className="columns">
        <div className={classNames('column', 'is-1', timeColumnStyles.tableColumn)}>
          {timesColumn}
        </div>
        <div className={classNames('column', 'is-2', timeColumnStyles.tableColumn)}>{array}</div>
        <div className={classNames('column', 'is-2', timeColumnStyles.tableColumn)}>{array}</div>
        <div className={classNames('column', 'is-2', timeColumnStyles.tableColumn)}>{array}</div>
        <div className={classNames('column', 'is-2', timeColumnStyles.tableColumn)}>{array}</div>
        <div className={classNames('column', 'is-2', timeColumnStyles.tableColumn)}>{array}</div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  timetables: state.timetables.timetables,
  loading: state.timetables.loading,
  error: state.timetables.error,
});
export default connect(mapStateToProps)(TimetableInfo);
