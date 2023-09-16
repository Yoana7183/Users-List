import React, { useContext } from 'react';
import Navigation from './components/Navigation';
import { Link, Outlet } from 'react-router-dom';
import { UserListContext } from './context/UserListContextProvider';
const UserListTaskMainPage = () => {
  const { loading, setLoading, error } = useContext(UserListContext);
  return (
    <div className="mt-10 mb-[10rem] relative">
      <Navigation />
      <Link to="/">
        <div className="flex">
          <p className="text-[10px] mt-1">Back</p>
        </div>
      </Link>
      <Outlet />
      {loading ? (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-28 w-28 border-t-8 border-b-8 border-grey-500"></div>
        </div>
      ) : null}
      {error ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          {setLoading(false)}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-red-500 text-center mb-4">
              Error: {error.message}
            </p>
            <Link to="/">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                Return to Home Page
              </button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserListTaskMainPage;
