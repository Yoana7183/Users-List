import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="flex justify-center mx-auto">
      <div className="px-10 py-4">
        <NavLink
          exact
          to="/"
          className="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300"
        >
          Home Page
        </NavLink>
      </div>
      <div className="px-10 py-4">
        <NavLink
          to="/todos"
          className="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300"
        >
          Tasks
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
