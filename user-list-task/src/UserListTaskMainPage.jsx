import React, { useContext } from 'react';
import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import { UserListContext } from './context/UserListContextProvider';
const UserListTaskMainPage = () => {
  const { loading } = useContext(UserListContext);
  return (
    <div className="mt-10 mb-[10rem] relative">
      <Navigation />
      <Outlet />
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-28 h-28 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : null}
    </div>
  );
};

export default UserListTaskMainPage;
