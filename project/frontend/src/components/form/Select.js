import React from 'react';

function Select({ options, onChange, value, name }) {
  return (
    <div className="control">
      <div className="select">
        <select value={value} name={name} onChange={onChange}>
          Slot type
          {options.map(option => {
            return (
              <option value={option.value} key={option.id}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Select;
