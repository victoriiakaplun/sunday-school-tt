import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
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
import Spinner from '../components/spinner/Spinner';
import TimetableCreation from '../scenes/timetableCreation';

function App({ getProfile, profileData, loading }) {
  const history = useHistory();
  useEffect(() => {
    getProfile();
  }, [getProfile]);

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
        <PrivateRoute exact path="/timetables" isAuthenticated={isAuth}>
          <Timetables />
        </PrivateRoute>
        <PrivateRoute path="/timetables/:id" isAuthenticated={isAuth}>
          <TimetableInfo />
        </PrivateRoute>
        <PrivateRoute path="/timeline" isAuthenticated={isAuth}>
          <Timeline />
        </PrivateRoute>
        <PrivateRoute exact path="/orders" isAuthenticated={isAuth}>
          <Orders />
        </PrivateRoute>
        <PrivateRoute exact path="/notifications" isAuthenticated={isAuth}>
          <Orders />
        </PrivateRoute>
        <PrivateRoute path="/profile" isAuthenticated={isAuth}>
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/timetable-creation" isAuthenticated={isAuth}>
          <TimetableCreation />
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
