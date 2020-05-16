import React from 'react';

function NavBarItem({ children }) {
  return (
    <div className="navbar-item" color="white">
      {children}
    </div>
  );
}

export default NavBarItem;
