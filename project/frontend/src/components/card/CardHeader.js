import React from 'react';

function CardHeader({ title }) {
  return (
    <h5 className="card-header" style={{ fontWeight: 'bold' }}>
      <p className="card-header-title">{title}</p>
    </h5>
  );
}

export default CardHeader;
