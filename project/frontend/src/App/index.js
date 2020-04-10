import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from '../scenes/Main';
import NavBar from './NavBar';
import Timetables from '../scenes/Timetables';
import Register from '../scenes/Register';
import Login from '../scenes/Login';
import Timeline from '../scenes/Timeline';
import Profile from '../scenes/Profile';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/timetables">
            <Timetables />
          </Route>
          <Route path="/timeline">
            <Timeline />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
