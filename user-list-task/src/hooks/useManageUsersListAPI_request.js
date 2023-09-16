import { useContext } from 'react';
import axios from 'axios';

import { UserListContext } from '../context/UserListContextProvider';
const useManageUsersListAPI_request = () => {
  const { setFirstTenUsers, setError, setLoading } =
    useContext(UserListContext);

  const getFirstTenUsers = () => {
    setError(false);
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users?_limit=10')
      .then((response) => {
        setFirstTenUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const updateUserPersonalData = (userId, newUserData) => {
    setError(false);
    setLoading(true);
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${userId}`, newUserData)
      .then((response) => {
        setFirstTenUsers((prevFirstTenUsers) => {
          return prevFirstTenUsers.map((user) => {
            if (user.id === userId) {
              // If the user ID matches, update the user data
              return response.data;
            } else {
              // Otherwise, keep the user data unchanged
              return user;
            }
          });
        });
        setLoading(false);
      })

      .catch((error) => {
        throw error;
      });
  };

  return {
    getFirstTenUsers,
    updateUserPersonalData,
  };
};

export default useManageUsersListAPI_request;
