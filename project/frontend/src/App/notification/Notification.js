import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import CloseButton from './CloseButton';

function Notification({ onClose, delay, type, children }) {
  useEffect(() => {
    setTimeout(() => onClose(), delay);
  }, [onClose, delay]);

  const containerClasses = classNames('notification', `is-${type}`);

  return (
    <Container>
      <div className={containerClasses}>
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
  delay: 10000,
};
export default Notification;
