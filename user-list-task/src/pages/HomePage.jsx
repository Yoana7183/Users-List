import React, { useContext, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import useManageUsersListAPIrequest from '../hooks/useManageUsersListAPIrequest';
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
  const { getFirstTenUsers } = useManageUsersListAPIrequest();
  useEffect(() => {
    getFirstTenUsers();
  }, []);
  const { firstTenUsers } = useContext(UserListContext);

  if (firstTenUsers == null) {
    return;
  }

  return (
    <section className="flex flex-col items-center">
      <h2
        className={`text-2xl flex justify-center mb-4 text-centerfont-medium text-gray-500 uppercase tracking-wider`}
      >
        Users
      </h2>
      <div className="flex flex-col w-[80%] gap-6">
        {firstTenUsers.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
