import React, { useContext, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import useManageTaskAPI_request from '../hooks/useManageTaskAPI_request';
import TaskList from '../components/TaskList';
const TasksPage = () => {
  const { tasks, userNames } = useContext(UserListContext);
  const { getAllTasks, getAllUserName } = useManageTaskAPI_request();
  useEffect(() => {
    getAllTasks();
    getAllUserName();
  }, []);
  console.log(tasks);
  console.log(userNames);
  return <div>{tasks && <TaskList />}</div>;
};
export default TasksPage;
