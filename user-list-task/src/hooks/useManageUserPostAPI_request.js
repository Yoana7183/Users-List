import { useContext } from 'react';
import axios from 'axios';

import { UserListContext } from '../context/UserListContextProvider';
const useManageUserPostAPI_request = () => {
  const { setUserPost, setError, setLoading } = useContext(UserListContext);

  const getUserPostById = (userId) => {
    setError(false);
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setLoading(false);
        setUserPost(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  return { getUserPostById };
};

export default useManageUserPostAPI_request;
