import React, { useContext, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import useManageUsers from '../hooks/useManageUsers';
const HomePage = () => {
  const { getFirstTenUsers } = useManageUsers();
  useEffect(() => {
    getFirstTenUsers();
  }, []);
  const { users } = useContext(UserListContext);
  console.log(users);
  return (
    <div>
      <div> HOME PAGE/ User List</div>
    </div>
  );
};

export default HomePage;
