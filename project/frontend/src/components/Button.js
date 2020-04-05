import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({ type, children, onClick }) {
  // Bulma class here
  /* return (
    <div className="button">
      <FontAwesomeIcon css={{ color: 'hotpink', marginRight: '10px' }} icon="crow" />
      :&nbsp; React is Awesome!
    </div>
  ); */

  return (
    <button type="button" className={`button is-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
