import React, { useContext } from 'react';
import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import { UserListContext } from './context/UserListContextProvider';
import Loading from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
/**
 * UserListTaskMainPage component represents the main page of the user list and tasks.
 *
 * This component handles loading and error states and displays the appropriate UI components.
 *
 * @component
 * @returns {JSX.Element} The main page component.
 */
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
