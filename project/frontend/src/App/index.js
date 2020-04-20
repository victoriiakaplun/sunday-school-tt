import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
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

import { UserContext } from './context/userContext';
import { getProfile } from '../service/TimetableAPI';

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfile();
      console.log(data);
      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          isAdmin: data.role === 'admin',
        });
      } else {
        history.push('/signin');
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <NavBar />
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
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/logout" />
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
