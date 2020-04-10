import React from 'react';

function FlexBox({ children }) {
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>;
}

export default FlexBox;
