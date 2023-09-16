import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserListContext = createContext();

const UserListContextProvider = ({ children }) => {
  const [firstTenUsers, setFirstTenUsers] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState();
  const [task, setTask] = useState();
  return (
    <UserListContext.Provider
      value={{
        firstTenUsers,
        setFirstTenUsers,
        userPosts,
        setUserPosts,
        task,
        setTask,
        error,
        setError,
        loading,
        setLoading,
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
