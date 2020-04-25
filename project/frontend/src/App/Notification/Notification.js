import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../../components/button/Button';
import CloseButton from './CloseButton';

function Notification({ onClose, delay, children }) {
  useEffect(() => {
    setTimeout(() => onClose(), 5000);
  }, [onClose, delay]);
  return (
    <Container>
      <div className="notification is-warning">
        <CloseButton onClose={onClose} />
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
