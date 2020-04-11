import React from 'react';

function CardHeader({ title }) {
  return (
    <header className="card-header" style={{ fontWeight: 'bold' }}>
      <p className="card-header-title">{title}</p>
    </header>
  );
}

export default CardHeader;
