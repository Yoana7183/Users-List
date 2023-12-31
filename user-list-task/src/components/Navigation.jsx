import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navigation component responsible for rendering navigation links.
 *
 * @component
 * @returns {JSX.Element} The navigation component.
 */
const Navigation = () => {
  return (
    <nav className="flex justify-center mx-auto mb-14">
      <div className="px-7 py-4">
        <NavLink
          exact={true}
          to="/"
          className="text-xl flex justify-center mb-4 text-centerfont-medium text-gray-500 uppercase tracking-wider mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300"
        >
          Home Page
        </NavLink>
      </div>
      <div className="px-7 py-4">
        <NavLink
          to="/todos"
          className="text-xl flex justify-center mb-4 text-centerfont-medium text-gray-500 uppercase tracking-wider mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300"
        >
          Tasks
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
