import React, { useContext, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import useManageUsers from '../hooks/useManageUsers';
import UserList from '../components/UserList';
const HomePage = () => {
  const { getFirstTenUsers } = useManageUsers();
  useEffect(() => {
    getFirstTenUsers();
  }, []);
  const { firstTenUsers } = useContext(UserListContext);

  if (firstTenUsers == null) {
    return;
  }

  return (
    <div>
      <div> HOME PAGE/ User List</div>
      {firstTenUsers.map((user) => {
        return <UserList key={user.id} user={user} />;
      })}
    </div>
  );
};

export default HomePage;
