import React, { useContext } from 'react';
import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import { UserListContext } from './context/UserListContextProvider';
import Loading from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
const UserListTaskMainPage = () => {
  const { loading, error } = useContext(UserListContext);

  return (
    <main className="mt-10 mb-[10rem] relative">
      <Navigation />
      {error ? <ErrorPage /> : null}
      {!error && loading ? <Loading /> : null}
      <Outlet />
    </main>
  );
};

export default UserListTaskMainPage;
