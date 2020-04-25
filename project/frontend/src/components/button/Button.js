import React from 'react';

function Button({ children, onClick }) {
  return (
    <button className="button is-success id-medium" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
