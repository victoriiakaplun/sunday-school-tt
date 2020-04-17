import React, { useContext } from 'react';
import Header from '../../components/header/Header';
import Button from '../../components/Button';
import TimetablesList from './TimetablesList';
import { UserContext } from '../../App/context/userContext';

function Timetables() {
  const isAdmin = true;
  const userContext = useContext(UserContext);

  const button = (
    <div className="field is-grouped is-grouped-centered">
      <Button>+ Create timetable</Button>
    </div>
  );

  return (
    <div className="columns is-centered">
      <div className="column is-half is-center">
        {isAdmin && button}
        <Header>Available timetables</Header>
        <TimetablesList />
      </div>
    </div>
  );
}

export default Timetables;
