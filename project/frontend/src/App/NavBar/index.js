import React from 'react';
import NavBarMenu from './NavBarMenu';
import NavBarBrand from './NavBarBrand';

function NavBar() {
  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <NavBarBrand />
      <NavBarMenu />
    </div>
  );
}

export default NavBar;
