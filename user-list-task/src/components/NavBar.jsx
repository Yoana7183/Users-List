import React from 'react';

import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="mt-10">
      <div>
        <NavLink to={`/user/posts:userId`}> User Posts </NavLink>
      </div>
      <div>
        <NavLink to={`/user/todos:userId`}> Tasks </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
