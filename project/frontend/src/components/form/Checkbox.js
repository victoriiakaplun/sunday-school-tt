import React from 'react';

function Checkbox({ children, onChange, name, value, placeholder }) {
  return (
    <div>
      <label htmlFor={children} className="checkbox">
        {children}
      </label>
      <div className="control">
        <input
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          value={value}
          type="checkbox"
        />
      </div>
    </div>
  );
}

export default Checkbox;
