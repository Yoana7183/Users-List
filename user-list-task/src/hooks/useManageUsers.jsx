import { useContext } from 'react';
import axios from 'axios';

import { UserListContext } from '../context/UserListContextProvider';
const useManageUsers = () => {
  const { setUsers, setError, setLoading } = useContext(UserListContext);
  const getFirstTenUsers = () => {
    setError(false);
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users?_limit=10')
      .then((response) => {
        setLoading(false);
        setUsers(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  return { getFirstTenUsers };
};

export default useManageUsers;
