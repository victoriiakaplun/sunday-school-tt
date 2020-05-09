import { faAddressCard, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import NavBarItem from './NavBarItem';
import AuthButtons from './AuthButtons';
import { getUserProfile } from '../../store/actions/profileActions';
import { logout } from '../../store/actions/authActions';
import Spinner from '../../components/Spinner';

function NavBarMenu({ isAuth, error, loading, profileData, getProfile, logoutUser }) {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const history = useHistory();

  async function onHandleLogout() {
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

  if (loading) {
    return <Spinner />;
  }

  console.log('IN NAVBAR: ', profileData, isAuth, loading, error);

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
          {profileData && profileData.name}
        </NavBarItem>
        <NavBarItem>
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

const mapStateToProps = state => ({
  isAuth: state.authenticaion.isAuth,
  profileData: state.profile.profileData,
  loading: state.profile.loading,
  error: state.profile.error,
});

const mapDispatchToProps = {
  getProfile: getUserProfile,
  logoutUser: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMenu);
