import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Context for managing user data and related state.
 * @type {React.Context}
 */
export const UserListContext = createContext();

/**
 * Provider component for the UserListContext.
 * @param {React.ReactNode} props.children - The child elements to be wrapped by this provider.
 */
const UserListContextProvider = ({ children }) => {
  /**
   * Array of user data representing the first ten users fetched from an API.
   * @type {Array}
   */
  const [firstTenUsers, setFirstTenUsers] = useState([]);

  /**
   * Indicates whether an error has occurred during API requests or data processing.
   * @type {boolean}
   */
  const [error, setError] = useState(false);

  /**
   * Indicates whether data is currently being fetched or loaded.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * Array of user posts or data related to user posts.
   * Used for displaying or managing user-generated content.
   * @type {Array}
   */
  const [userPosts, setUserPosts] = useState([]);

  /**
   * Stores user names .
   * Used for managing user data and displaying user names.
   * @type {Array}
   */
  const [userNames, setUserNames] = useState([]);

  /**
   * Array of tasks.
   * Used to manage task-related data and display, update, or manipulate tasks.
   * @type {Array}
   */
  const [tasks, setTasks] = useState([]);

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
