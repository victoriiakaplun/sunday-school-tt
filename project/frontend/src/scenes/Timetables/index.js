import React, { useContext } from 'react';
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import TimetablesList from './TimetablesList';
import { UserContext } from '../../App/context/userContext';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Columns from '../../components/Columns';
import Column from '../../components/Column';

function Timetables() {
  const { user } = useContext(UserContext);

  const button = (
    <CenteredButtonBox>
      <Button>+ Create timetable</Button>
    </CenteredButtonBox>
  );

  return (
    <Columns>
      <Column>
        {user && user.isAdmin && button}
        <Header>Available timetables</Header>
        <TimetablesList />
      </Column>
    </Columns>
  );
}

export default Timetables;
