import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from '../scenes/Main';
import NavBar from './NavBar';
import Timetables from '../scenes/Timetables';
import Register from '../scenes/Register';
import Login from '../scenes/Login';
import Timeline from '../scenes/Timeline';
import Profile from '../scenes/Profile';
import TimetableInfo from '../scenes/TimetableInfo';

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
          <Route exact path="/timetables">
            <Timetables />
          </Route>
          <Route path="/timetables/:id">
            <TimetableInfo />
          </Route>
          <Route path="/timeline">
            <Timeline />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
