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
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-28 w-28 border-t-8 border-b-8 border-grey-500"></div>
        </div>
      ) : null}
    </div>
  );
};

export default UserListTaskMainPage;
