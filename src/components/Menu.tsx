import React from "react";
import { Link, Outlet } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <>
      <nav>
        <Link to=".">Home</Link>
        <Link to="cocktails">Cocktails</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Menu;
