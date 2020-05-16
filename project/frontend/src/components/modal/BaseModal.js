import React from 'react';

function BaseModal({ children }) {
  return (
    <div className="modal">
      <div className="modal-background">
        <div className="modal-card">{children}</div>
      </div>
    </div>
  );
}

export default BaseModal;
