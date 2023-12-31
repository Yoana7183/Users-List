import { useContext } from 'react';
import axios from 'axios';
import { baseUrl } from './baseURL';

import { UserListContext } from '../context/UserListContextProvider';

/**
 * Custom React hook for managing API requests related to user data.
 * @returns {object} An object containing functions for fetching and updating user data.
 */
const useManageUsersListAPIrequest = () => {
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
        /**
         * If API return empty user.data the context will return the empty field and the data can be added via edit UI
         */
        const updatedUsers = response.data.map((user) => ({
          id: user.id,
          name: user.name || '',
          username: user.username || '',
          email: user.email || '',
          address: {
            street: user.address?.street || '',
            suite: user.address?.suite || '',
            city: user.address?.city || '',
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

export default useManageUsersListAPIrequest;
