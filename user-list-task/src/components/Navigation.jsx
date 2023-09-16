import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="flex mx-10">
      <div className="px-10">
        <NavLink to={`/`}> Home Page </NavLink>
      </div>
      <div className="px-10">
        <NavLink to={`/todos`}> Tasks </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
