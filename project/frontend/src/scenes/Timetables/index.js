import React from 'react';
import Header from '../../components/header/Header';
import FlexBox from '../../components/FlexBox';
import Button from '../../components/Button';

function Timetables() {
  return (
    <div>
      <FlexBox>
        <Button>+ Create timetable</Button>
        <Header>Available timetables</Header>
      </FlexBox>
    </div>
  );
}

export default Timetables;
