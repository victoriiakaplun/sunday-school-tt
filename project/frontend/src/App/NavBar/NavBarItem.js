import React from 'react';
import { Link } from 'react-router-dom';

function NavBarItem({ children }) {
  return (
    <div className="navbar-item" color="white">
      {children}
    </div>
  );
}

export default NavBarItem;
