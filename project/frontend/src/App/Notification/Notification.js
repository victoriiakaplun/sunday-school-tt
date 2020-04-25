import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../../components/Button';

function Notification({ onClose, delay, children }) {
  useEffect(() => {
    setTimeout(() => onClose(), 5000);
  }, [onClose, delay]);
  return (
    <Container>
      <div className="notification is-warning">
        <button type="button" className="delete" onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;

Notification.defaultProps = {
  delay: 5,
};
export default Notification;
