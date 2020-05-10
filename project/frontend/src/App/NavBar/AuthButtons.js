import React from 'react';
import NavBarItem from './NavBarItem';
import Button from '../../components/button/Button';

function AuthButtons() {
  return (
    <div className="navbar-end">
      <div className="buttons">
        <NavBarItem to="/signin">
          <Button>Sign In</Button>
        </NavBarItem>
        <NavBarItem to="/register">
          <Button>Register</Button>
        </NavBarItem>
      </div>
    </div>
  );
}

export default AuthButtons;
