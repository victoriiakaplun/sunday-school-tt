import React, { useContext } from 'react';
import Header from '../../components/header/Header';
import Button from '../../components/Button';
import TimetablesList from './TimetablesList';
import { UserContext } from '../../App/context/userContext';
import CenteredButtonBox from '../../components/CenteredButtonBox';
import Columns from '../../components/Columns';
import Column from '../../components/Column';

function Timetables() {
  const { user } = useContext(UserContext);
  const isAdmin = true;

  const button = (
    <CenteredButtonBox>
      <Button>+ Create timetable</Button>
    </CenteredButtonBox>
  );

  return (
    <Columns>
      <Column>
        {isAdmin && button}
        <Header>Available timetables</Header>
        <TimetablesList />
      </Column>
    </Columns>
  );
}

export default Timetables;
