import React from 'react';
import { faUserCircle, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarItem from './NavBarItem';

function NavBarMenu() {
  return (
    <div className="navbar-menu">
      <div className="navbar-start">
        <NavBarItem to="/timetables">Timetables</NavBarItem>
        <NavBarItem to="/timeline">Timeline</NavBarItem>
      </div>
      <div className="navbar-end">
        <NavBarItem to="/notifications">
          <FontAwesomeIcon icon={faBell} size="lg" css={{ color: 'green' }} />
        </NavBarItem>
        <NavBarItem to="/profile">
          <FontAwesomeIcon icon={faUserCircle} size="lg" css={{ color: 'green' }} />
        </NavBarItem>
        <NavBarItem to="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" css={{ color: 'green' }} />
        </NavBarItem>
      </div>
    </div>
  );
}

export default NavBarMenu;
