import React, { useContext } from 'react';
import { faAddressCard, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import NavBarItem from './NavBarItem';
import AuthButtons from './AuthButtons';
import { logout } from '../../service/TimetableAPI';
import { UserContext } from '../context/userContext';

function NavBarMenu() {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  if (!user) {
    return (
      <div className="navbar-menu">
        <AuthButtons />
      </div>
    );
  }

  async function onHandleLogout() {
    await logout();
    setUser(null);
    history.push('/signin');
  }

  return (
    <div className="navbar-menu">
      <div className="navbar-start">
        <NavBarItem to="/timetables">Timetables</NavBarItem>
        <NavBarItem to="/timeline">Timeline</NavBarItem>
        <NavBarItem to="/orders">Orders</NavBarItem>
      </div>
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
            onClick={onHandleLogout}
          />
        </NavBarItem>
      </div>
    </div>
  );
}

export default NavBarMenu;
