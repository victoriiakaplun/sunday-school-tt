import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import TimetableDetailsBox from './TimetableDetailsBox';

function TimetableInfo({ timetables }) {
  const { id } = useParams();
  const parsedId = Number.parseInt(id, 10);
  const timetable = timetables.find(t => t.id === parsedId);
  const { title, start, end, slotSize, Attribute } = timetable;

  const timesColumn = [-1, ...Array(24).keys()].map(timesItem => {
    if (timesItem === -1) {
      return (
        <div
          className="card-content"
          style={{ textAlign: 'left', verticalAlign: 'top', border: '1px solid gainsboro' }}
        />
      );
    }

    return (
      <div className="card-content" style={{ textAlign: 'right', border: '1px solid gainsboro' }}>
        {`${timesItem}:00`}
      </div>
    );
  });

  return (
    <div>
      <Header>Timetable details</Header>
      <TimetableDetailsBox info={{ title, start, end, slotSize, Attribute }} />
      <div className="columns">
        <div className="column is-1">{timesColumn}</div>
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
