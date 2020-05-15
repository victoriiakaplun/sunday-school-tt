import React from 'react';

function Field({ children, type, name, placeholder, value, onChange }) {
  return (
    <div className="field">
      <label htmlFor={children} className="label">
        {children}
      </label>
      <div className="control">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export default Field;
