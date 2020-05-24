import React from 'react';
import classNames from 'classnames';
import styles from './Subheader.scss';

function Subheader({ children }) {
  return <h2 className={classNames(styles.header, 'subtitle')}>{children}</h2>;
}

export default Subheader;
