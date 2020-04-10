import React from 'react';
import Header from './Header';

function Card({ title }) {
  return (
    <div>
      <Header>{title}</Header>
    </div>
  );
}

export default Card;
