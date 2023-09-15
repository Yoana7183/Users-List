import React from 'react';
import NavBar from './components/NavBar';
import { Link, Outlet } from 'react-router-dom';

const UserListTask = () => {
  return (
    <div>
      <div>Main component</div>
      <NavBar />
      <Link to="/user/">
        <div className=" hidden sm:flex">
          <p className="text-[10px] mt-1 ">Back</p>
        </div>
      </Link>
      <Outlet />
    </div>
  );
};

export default UserListTask;
