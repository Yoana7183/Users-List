import { useContext } from 'react';
import axios from 'axios';

import { UserListContext } from '../context/UserListContextProvider';
const useManageUsers = () => {
  const { setFirstTenUsers, setError, setLoading } =
    useContext(UserListContext);

  const fetchFirstTenUsers = () => {
    setError(false);
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users?_limit=10')
      .then((response) => {
        setLoading(false);
        setFirstTenUsers(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  const getFirstTenUsers = () => {
    fetchFirstTenUsers();
  };
  const updateUserPersonalData = (userId, newUserData) => {
    setError(false);
    setLoading(true);
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${userId}`, newUserData)
      .then((response) => {
        setLoading(false);
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

export default useManageUsers;
