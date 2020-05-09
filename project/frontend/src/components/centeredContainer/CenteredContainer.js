import React from 'react';

import container from './CenteredContainer.scss';

function CenteredContainer({ children }) {
  return <div className={container}>{children}</div>;
}

export default CenteredContainer;
