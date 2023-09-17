import React, { useContext, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import useManageTaskAPI_request from '../hooks/useManageTaskAPI_request';
import TaskList from '../components/TaskList';
const TasksPage = () => {
  const { tasks } = useContext(UserListContext);
  const { getAllTasks, getAllUserName } = useManageTaskAPI_request();
  useEffect(() => {
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
