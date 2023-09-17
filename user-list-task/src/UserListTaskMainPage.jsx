import React, { useContext } from 'react';
import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import { UserListContext } from './context/UserListContextProvider';
import Loading from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
const UserListTaskMainPage = () => {
  const { loading, error } = useContext(UserListContext);
  return (
    <div className="mt-10 mb-[10rem] relative">
      <Navigation />
      <Outlet />
      {error || error == null ? <ErrorPage /> : null}
      {!error && loading ? <Loading /> : null}
    </div>
  );
};

export default UserListTaskMainPage;
