import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CenteredContainer from '../centeredContainer/CenteredContainer';

function Spinner() {
  return (
    <CenteredContainer>
      <FontAwesomeIcon icon={faSpinner} size="lg" css={{ color: 'green', align: 'auto' }} />
      <p>...Loading</p>
    </CenteredContainer>
  );
}

export default Spinner;
