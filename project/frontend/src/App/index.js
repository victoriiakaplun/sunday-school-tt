import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import NavBar from './NavBar';
import NotificationContainer from './Notification/NotificationContainer';
import { getUserProfile } from '../store/actions/profileActions';
import PrivateRoute from './router/PrivateRoute';

function App({ getProfile, profileData }) {
  useEffect(() => {
    getProfile();
  }, []);

  const isAuthenticated = Boolean(profileData);

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
        <PrivateRoute exact path="/timetables" isAuthenticated={isAuthenticated}>
          <Timetables />
        </PrivateRoute>
        <PrivateRoute path="/timetables/:id" isAuthenticated={isAuthenticated}>
          <TimetableInfo />
        </PrivateRoute>
        <PrivateRoute path="/timeline" isAuthenticated={isAuthenticated}>
          <Timeline />
        </PrivateRoute>
        <PrivateRoute exact path="/orders" isAuthenticated={isAuthenticated}>
          <Orders />
        </PrivateRoute>
        <PrivateRoute exact path="/notifications" isAuthenticated={isAuthenticated}>
          <Orders />
        </PrivateRoute>
        <PrivateRoute path="/profile" isAuthenticated={isAuthenticated}>
          <Profile />
        </PrivateRoute>
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
