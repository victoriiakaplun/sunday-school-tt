import React from 'react';

function CardHeader({ children }) {
  return (
    <h5 className="card-header" style={{ fontWeight: 'bold' }}>
      <p className="card-header-title">{children}</p>
    </h5>
  );
}

export default CardHeader;
