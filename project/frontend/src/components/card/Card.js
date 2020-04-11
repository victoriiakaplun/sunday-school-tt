import React from 'react';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

function Card({ title, body }) {
  return (
    <div className="card" style={{ margin: '20px' }}>
      <CardHeader title={title} />
      <CardBody body={body} />
    </div>
  );
}

export default Card;
