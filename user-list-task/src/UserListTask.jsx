import React from 'react';
import Navigation from './components/Navigation';
import { Link, Outlet } from 'react-router-dom';

const UserListTask = () => {
  return (
    <div className="mt-10 mb-[10rem]">
      <Navigation />
      <Link to="/">
        <div className="flex">
          <p className="text-[10px] mt-1 ">Back</p>
        </div>
      </Link>
      <Outlet />
    </div>
  );
};

export default UserListTask;
