import React from 'react';

function BaseModal({ children, onClose }) {
  return (
    <div className="modal is-active">
      <div
        aria-hidden="true"
        aria-label="modal"
        role="button"
        tabIndex="0"
        className="modal-background"
        onClick={onClose}
      />
      <div className="modal-content">
        <div className="modal-card">{children}</div>
      </div>
    </div>
  );
}

export default BaseModal;
