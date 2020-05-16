import React from 'react';

function CloseButton({ onClose }) {
  return (
    <button type="button" className="delete" onClick={onClose}>
      x
    </button>
  );
}

export default CloseButton;
