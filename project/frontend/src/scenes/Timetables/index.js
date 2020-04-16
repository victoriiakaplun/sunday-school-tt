import React from 'react';
import Header from '../../components/header/Header';
import Button from '../../components/Button';
import TimetablesList from './TimetablesList';

function Timetables() {
  return (
    <div className="columns is-centered">
      <div className="column is-half is-center">
        <div className="field is-grouped is-grouped-centered">
          <Button>+ Create timetable</Button>
        </div>
        <Header>Available timetables</Header>
        <TimetablesList />
      </div>
    </div>
  );
}

export default Timetables;
