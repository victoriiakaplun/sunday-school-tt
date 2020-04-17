import React, { useContext } from 'react';
import { faAddressCard, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarItem from './NavBarItem';
import Button from '../../components/Button';
import { logout } from '../../service/TimetableAPI';
import { UserContext } from '../context/userContext';

function NavBarMenu() {
  const userContext = useContext(UserContext);
  const user = null;

  let navBarEnd;
  let navBarStart;

  if (!user) {
    navBarStart = null;
    navBarEnd = (
      <div className="navbar-end">
        <NavBarItem to="/signin">
          <Button>Sign In</Button>
        </NavBarItem>
        <NavBarItem to="/register">
          <Button>Register</Button>
        </NavBarItem>
      </div>
    );
  } else {
    navBarStart = (
      <div className="navbar-start">
        <NavBarItem to="/timetables">Timetables</NavBarItem>
        <NavBarItem to="/timeline">Timeline</NavBarItem>
      </div>
    );
    navBarEnd = (
      <div className="navbar-end">
        <NavBarItem to="/notifications">
          <FontAwesomeIcon icon={faBell} size="lg" css={{ color: 'green' }} />
        </NavBarItem>
        <NavBarItem to="/profile">
          <FontAwesomeIcon icon={faAddressCard} size="lg" css={{ color: 'green', margin: '7px' }} />
          {user && user.name}
        </NavBarItem>
        <NavBarItem to="/logout">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="lg"
            css={{ color: 'green' }}
            onClick={logout}
          />
        </NavBarItem>
      </div>
    );
  }

  return (
    <div className="navbar-menu">
      {navBarStart}
      {navBarEnd}
    </div>
  );
}

export default NavBarMenu;
