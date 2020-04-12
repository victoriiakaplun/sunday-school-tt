import React from 'react';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarItem from './NavBarItem';

function NavBarBrand() {
  return (
    <div className="navbar-brand">
      <NavBarItem to="/">
        <FontAwesomeIcon icon={faStopwatch} size="lg" css={{ color: 'green' }} />
      </NavBarItem>
    </div>
  );
}

export default NavBarBrand;
