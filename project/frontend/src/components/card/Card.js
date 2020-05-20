import React from 'react';

function Card({ children }) {
  return (
    <div className="card" style={{ margin: '20px' }}>
      {children}
    </div>
  );
}

export default Card;
