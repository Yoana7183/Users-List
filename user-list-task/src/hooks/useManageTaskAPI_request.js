import { useContext } from 'react';
import axios from 'axios';

import { UserListContext } from '../context/UserListContextProvider';

const useManageTaskAPI_request = () => {
  const { setUserNames, setTasks, setError, setLoading } =
    useContext(UserListContext);

  const getAllTasks = () => {
    setError(false);
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  const getAllUserName = () => {
    setError(false);
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data.map((user) => ({
          id: user.id,
          name: user.name,
        }));
        setUserNames(users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  return { getAllTasks, getAllUserName };
};

export default useManageTaskAPI_request;
