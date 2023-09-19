import { useContext } from 'react';
import axios from 'axios';
import { UserListContext } from '../context/UserListContextProvider';
import { baseUrl } from './baseURL';

/**
 * Custom React hook for managing API requests related to tasks and user names.
 * @returns {object} An object containing functions for fetching tasks, user names, and updating tasks.
 */
const useManageTaskAPIrequest = () => {
  const { setUserNames, setTasks, tasks, setError, setLoading } =
    useContext(UserListContext);

  /**
   * Fetches all tasks from a remote API and updates the tasks context.
   */
  const getAllTasks = () => {
    setError(false);
    setLoading(true);
    axios
      .get(`${baseUrl}todos`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  /**
   * Fetches all user names from a remote API and updates the user names context.
   */
  const getAllUserName = () => {
    setError(false);
    setLoading(true);
    axios
      .get(`${baseUrl}users`)
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

  /**
   * Updates a task by task ID with new task data on the remote API and updates the tasks context.
   * @param {number} taskId - The ID of the task to update.
   * @param {object} updatedTaskData - The new task data to set.
   */
  const updateTask = (taskId, updatedTaskData) => {
    setError(false);
    setLoading(true);
    axios
      .put(`${baseUrl}todos/${taskId}`, updatedTaskData)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, ...response.data } : task
        );
        setTasks(updatedTasks);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  return { getAllTasks, getAllUserName, updateTask };
};

export default useManageTaskAPIrequest;
