import { useContext } from 'react';
import axios from 'axios';
import { baseUrl } from './baseURL';

import { UserListContext } from '../context/UserListContextProvider';

/**
 * Custom React hook for managing API requests related to user data.
 * @returns {object} An object containing functions for fetching and updating user data.
 */
const useManageUsersListAPI_request = () => {
  const { setFirstTenUsers, setError, setLoading } =
    useContext(UserListContext);

  /**
   * Fetches the first ten users from a remote API and updates the user data context.
   * Updates a setError state in context  if the API request fails.
   */
  const getFirstTenUsers = () => {
    setError(false);
    setLoading(true);
    axios
      .get(`${baseUrl}users?_limit=10`)
      .then((response) => {
        setLoading(false);
        const updatedUsers = response.data.map((user) => ({
          id: user.id,
          name: user.name || null,
          username: user.username || null,
          email: user.email || null,
          address: {
            street: user.address?.street || null,
            suite: user.address?.suite || null,
            city: user.address?.city || null,
          },
        }));
        setFirstTenUsers(updatedUsers);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  /**
   * Updates a user's personal data on the remote API and updates the user data context.
   * @param {number} userId - The ID of the user to update.
   * @param {object} newUserData - The new user data to set.
   * Updates a setError state in context  if the API request fails
   */
  const updateUserPersonalData = (userId, newUserData) => {
    setError(false);
    setLoading(true);
    axios
      .put(`${baseUrl}users/${userId}`, newUserData)
      .then((response) => {
        setFirstTenUsers((prevFirstTenUsers) => {
          return prevFirstTenUsers.map((user) => {
            if (user.id === userId) {
              // use ternary operator
              // If the user ID matches, update the user data
              return response.data;
            }
            return user;
          });
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return {
    getFirstTenUsers,
    updateUserPersonalData,
  };
};

export default useManageUsersListAPI_request; // camel case
