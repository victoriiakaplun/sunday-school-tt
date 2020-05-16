import React from 'react';
import classNames from 'classnames';

import styles from './Divider.scss';

function Divider({ children }) {
  return <div className={classNames(styles.divider)}>{children}</div>;
}

export default Divider;
