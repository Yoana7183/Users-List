import React, { useContext, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import useManageTaskAPI_request from '../hooks/useManageTaskAPI_request';
import TaskList from '../components/TaskList';
/**
 * TasksPage component displays a list of tasks.
 *
 * This component fetches and displays a list of tasks, along with the associated user names,
 * using data from the UserListContext and the useManageTaskAPI_request hook.
 *
 * @component
 * @returns {JSX.Element} The TasksPage component.
 */
const TasksPage = () => {
  const { tasks } = useContext(UserListContext);
  const { getAllTasks, getAllUserName } = useManageTaskAPI_request();
  useEffect(() => {
    // Fetch all tasks and user names when the component mounts.
    getAllTasks();
    getAllUserName();
  }, []);

  return (
    <>
      <section className="flex justify-center">{tasks && <TaskList />}</section>
    </>
  );
};
export default TasksPage;
