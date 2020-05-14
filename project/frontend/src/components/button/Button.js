import React from 'react';
import classNames from 'classnames';

function Button({ children, onClick, type = 'is-success' }) {
  return (
    <button className={classNames('button', type, 'is-medium')} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
