import React from 'react';
import Button from '../../components/button/Button';
import LinkedNavBarItem from './LinkedNavBarItem';

function AuthButtons() {
  return (
    <div className="navbar-end">
      <div className="buttons">
        <LinkedNavBarItem to="/signin">
          <Button>Sign In</Button>
        </LinkedNavBarItem>
        <LinkedNavBarItem to="/register">
          <Button>Register</Button>
        </LinkedNavBarItem>
      </div>
    </div>
  );
}

export default AuthButtons;
