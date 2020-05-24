import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Timetables,
  Register,
  Timeline,
  Profile,
  TimetableInfo,
  SignIn,
  Orders,
  Main,
} from '../scenes';
import NavBar from './navBar';
import NotificationContainer from './notification/NotificationContainer/NotificationContainer';
import { getUserProfile } from '../store/actions/user/profileActions';
import PrivateRoute from './router/PrivateRoute';
import Spinner from '../components/spinner/Spinner';
import TimetableCreation from '../scenes/TimetableCreation';

function App({ getProfile, profileData, loading }) {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return <Spinner />;
  }

  const isAuth = Boolean(profileData);

  return (
    <div>
      <NavBar />
      <NotificationContainer />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <PrivateRoute exact path="/timetables" component={Timetables} isAuthenticated={isAuth} />
        <PrivateRoute path="/timetables/:id" component={TimetableInfo} isAuthenticated={isAuth} />
        <PrivateRoute path="/timeline" component={Timeline} isAuthenticated={isAuth} />
        <PrivateRoute exact path="/orders" component={Orders} isAuthenticated={isAuth} />
        <PrivateRoute path="/profile" component={Profile} isAuthenticated={isAuth} />
        <PrivateRoute
          path="/timetable-creation"
          component={TimetableCreation}
          isAuthenticated={isAuth}
        />
        <Route render={() => <h2>Page not found</h2>} />
      </Switch>
    </div>
  );
}
const mapStateToProps = state => ({
  profileData: state.profile.profileData,
  loading: state.profile.loading,
  error: state.profile.error,
});

const mapDispatchToProps = {
  getProfile: getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
