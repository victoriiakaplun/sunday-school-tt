import { faAddressCard, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import NavBarItem from './NavBarItem';
import AuthButtons from './AuthButtons';
import { logout } from '../../store/actions/user/authActions';
import LinkedNavBarItem from './LinkedNavBarItem';
import MessageContainer from '../../components/message/MessagesContainer';

function NavBarMenu({ isAuth, error, profileData, logoutUser }) {
  const history = useHistory();
  const [isMessagesContainerActive, setMessagesContainerActive] = useState(false);
  const onShowMessages = () => {
    setMessagesContainerActive(prevState => !prevState);
  };

  const isAdmin = profileData && profileData.role === 'admin';
  async function onLogout() {
    logoutUser();
    history.push('/signin');
  }

  if (!isAuth) {
    return (
      <div className="navbar-menu">
        <AuthButtons />
      </div>
    );
  }

  if (error) {
    return <div />;
  }

  const orderNavBarItem = <LinkedNavBarItem to="/orders">Orders</LinkedNavBarItem>;

  return (
    <div className="navbar-menu">
      <div className="navbar-start">
        <LinkedNavBarItem to="/timetables">Timetables</LinkedNavBarItem>
        <LinkedNavBarItem to="/timeline">Timeline</LinkedNavBarItem>
        {isAdmin && orderNavBarItem}
      </div>
      <div className="navbar-end">
        <NavBarItem>
          <FontAwesomeIcon
            icon={faBell}
            size="lg"
            css={{ color: 'green' }}
            onClick={onShowMessages}
          />
          <MessageContainer show={isMessagesContainerActive} />
        </NavBarItem>
        <LinkedNavBarItem to="/profile">
          <FontAwesomeIcon icon={faAddressCard} size="lg" css={{ color: 'green', margin: '7px' }} />
          {profileData && profileData.name}
        </LinkedNavBarItem>
        <NavBarItem>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="lg"
            css={{ color: 'green' }}
            onClick={onLogout}
          />
        </NavBarItem>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuth: Boolean(state.profile.profileData),
  profileData: state.profile.profileData,
  loading: state.profile.loading,
  error: state.profile.error,
});

const mapDispatchToProps = {
  logoutUser: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMenu);
