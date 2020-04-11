import React from 'react';

function CardBody({ body }) {
  return (
    <div className="card-content">
      {Object.entries(body).map(([key, value]) => {
        return <div className="content">{`${key}: ${value}`}</div>;
      })}
    </div>
  );
}

export default CardBody;
