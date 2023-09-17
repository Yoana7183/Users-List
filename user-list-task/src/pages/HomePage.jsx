import React, { useContext, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import useManageUsersListAPI_request from '../hooks/useManageUsersListAPI_request';
import UserList from '../components/UserList';
/**
 * HomePage component displays a list of users on the home page.
 *
 * This component fetches the first ten users, and if available, renders them in a list format.
 * Return nothing if data is not available yet
 * @component
 * @returns {JSX.Element} The HomePage component.
 */
const HomePage = () => {
  const { getFirstTenUsers } = useManageUsersListAPI_request();
  useEffect(() => {
    getFirstTenUsers();
  }, []);
  const { firstTenUsers } = useContext(UserListContext);

  if (firstTenUsers == null) {
    return;
  }

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl text-gray-600  mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300">
        Users List
      </h1>
      <div className="flex flex-col w-[80%] gap-6">
        {firstTenUsers.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
