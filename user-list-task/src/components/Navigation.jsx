import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex justify-center mx-auto mb-14">
      <div className="px-10 py-4">
        <NavLink
          exact={true}
          to="/"
          className="text-xl text-gray-600  mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300"
        >
          Home Page
        </NavLink>
      </div>
      <div className="px-10 py-4">
        <NavLink
          to="/todos"
          className="text-xl text-gray-600  mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300"
        >
          Tasks
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
