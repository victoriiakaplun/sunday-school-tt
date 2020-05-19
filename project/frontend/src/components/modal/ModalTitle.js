import React from 'react';

function ModalTitle({ children }) {
  return (
    <h2 className="modal-card-head">
      <p className="modal-card-title">{children}</p>
    </h2>
  );
}

export default ModalTitle;
