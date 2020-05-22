import React from 'react';

function Radio({ children, name, placeholder, value, onChange }) {
  return (
    <div className="field-label">
      <label htmlFor={children} className="label">
        {children}
      </label>
      <input
        type="radio"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default Radio;
