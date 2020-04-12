import React from 'react';
import { v4 as uuid } from 'uuid';

function CardBody({ body }) {
  return (
    <div className="card-content">
      {Object.entries(body).map(([key, value]) => {
        return <div key={uuid()} className="content">{`${key}: ${value}`}</div>;
      })}
    </div>
  );
}

export default CardBody;
