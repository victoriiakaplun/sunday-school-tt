import React from 'react';
import { Link } from 'react-router-dom';

function NavBarItem({ to, children }) {
  return (
    <Link to={to} className="navbar-item" color="white">
      {children}
    </Link>
  );
}

export default NavBarItem;
