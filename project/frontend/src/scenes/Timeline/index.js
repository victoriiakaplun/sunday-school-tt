import React from 'react';
import Header from '../../components/header/Header';
import Column from '../../components/columns/Column';
import Columns from '../../components/columns/Columns';
import EventTimeline from './EventTimeline';

function Timeline() {
  return (
    <Columns>
      <Column>
        <Header>Timeline</Header>
        <EventTimeline />
      </Column>
    </Columns>
  );
}
export default Timeline;
