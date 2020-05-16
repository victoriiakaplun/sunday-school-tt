import React from 'react';
import Header from '../../components/header/Header';
import Divider from '../../components/divider/Divider';
import Column from '../../components/columns/Column';
import Columns from '../../components/columns/Columns';

function Timeline() {
  return (
    <Columns>
      <Column>
        <Header>Timeline</Header>
        <Divider>Upcoming events</Divider>
        <Divider>Previous events</Divider>
      </Column>
    </Columns>
  );
}
export default Timeline;
