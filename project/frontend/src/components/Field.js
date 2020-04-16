import React from 'react';

function Field({ children, type, placeholder }) {
  return (
    <div className="field">
      <label htmlFor={children} className="label">
        {children}
      </label>
      <div className="control">
        <input className="input" type={type} placeholder={placeholder} name={children} required />
      </div>
    </div>
  );
}

export default Field;
