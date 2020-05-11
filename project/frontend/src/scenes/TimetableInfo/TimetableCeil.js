import React from 'react';
import CardHeader from '../../components/card/CardHeader';
import CardBody from '../../components/card/CardBody';

function TimetableCeil() {
  const title = 'Meeting';
  const body = { name: 'Mr. Cat' };
  return (
    <div>
      <CardHeader title={title} />
      <CardBody body={body} />
    </div>
  );
}

export default TimetableCeil;
