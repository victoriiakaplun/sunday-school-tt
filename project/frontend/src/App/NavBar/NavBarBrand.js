import React from 'react';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkedNavBarItem from './LinkedNavBarItem';

function NavBarBrand() {
  return (
    <div className="navbar-brand">
      <LinkedNavBarItem to="/">
        <FontAwesomeIcon icon={faStopwatch} size="lg" css={{ margin: '10px', color: 'green' }} />
      </LinkedNavBarItem>
    </div>
  );
}

export default NavBarBrand;
