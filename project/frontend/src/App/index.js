import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
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

function App({ getProfile, profileData, error }) {
  const history = useHistory();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!profileData) {
    history.push('/signin');
  }

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
        <Route exact path="/timetables">
          <Timetables />
        </Route>
        <Route path="/timetables/:id">
          <TimetableInfo />
        </Route>
        <Route path="/timeline">
          <Timeline />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
        <Route exact path="/notifications">
          <Orders />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
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
