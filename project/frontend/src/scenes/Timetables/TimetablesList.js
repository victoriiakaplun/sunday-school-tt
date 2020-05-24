import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTimetables } from '../../store/actions/timetable/timetablesActions';
import Spinner from '../../components/spinner/Spinner';
import TimetableCard from './TimetableCard';

function TimetablesList({ getTimetables, loading, error, timetables }) {
  useEffect(() => {
    getTimetables();
  }, [getTimetables]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div />;
  }

  return timetables.map(({ id, title, slotSize, start, end }) => {
    return <TimetableCard key={id} id={id} title={title} body={{ slotSize, start, end }} />;
  });
}

const mapStateToProps = state => ({
  timetables: state.timetables.timetables,
  loading: state.timetables.loading,
  error: state.timetables.error,
});

const mapDispatchToProps = {
  getTimetables: fetchTimetables,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimetablesList);
