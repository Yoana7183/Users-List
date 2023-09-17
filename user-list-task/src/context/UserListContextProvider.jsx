import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserListContext = createContext();

const UserListContextProvider = ({ children }) => {
  const [firstTenUsers, setFirstTenUsers] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState({});
  const [userNames, setUserNames] = useState({});
  const [tasks, setTasks] = useState();

  return (
    <UserListContext.Provider
      value={{
        firstTenUsers,
        setFirstTenUsers,
        userPosts,
        setUserPosts,
        tasks,
        setTasks,
        error,
        setError,
        loading,
        setLoading,
        userNames,
        setUserNames,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
};

export default UserListContextProvider;
UserListContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
