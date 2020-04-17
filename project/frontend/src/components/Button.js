import React from 'react';

function Button({ children, onClick }) {
  return (
    <button type="button" className="button is-success id-medium" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
