import React, { useContext, useState, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import Task from './Task';
import Pagination from './Pagination';
import useManageTaskAPI_request from '../hooks/useManageTaskAPI_request';
import NoMoreRecords from './NoMoreRecords';
import TaskFilters from './TaskFilters';
/**
 * TaskList component displays a list of tasks with various filters and pagination.
 *
 * This component displays a list of tasks with the ability to filter by status, title, and owner.
 * It also supports pagination for displaying a limited number of tasks per page.
 *
 * @component
 * @returns {JSX.Element} The rendered TaskList component.
 */
const TaskList = () => {
  const { updateTask } = useManageTaskAPI_request();
  const { tasks, userNames } = useContext(UserListContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all',
    title: '',
    owner: '',
  });

  const [filteredTasks, setFilteredTasks] = useState([]);

  const pageSize = 10;
  // Pagination
  const paginate = (items, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  };
  const paginatedTasks = paginate(filteredTasks, currentPage, pageSize);
  const getOwnerNameByUserId = (userId) => {
    const user = Array.isArray(userNames)
      ? userNames.find((user) => user.id === userId)
      : null;
    return user ? user.name : 'Unknown User';
  };

  useEffect(() => {
    // Filter tasks based on filters and user names
    const filteredTasks = tasks
      .filter((task) => {
        // status filter
        if (filters.status === 'completed') {
          return task.completed;
        } else if (filters.status === 'notCompleted') {
          return !task.completed;
        }
        return true; // 'all' status filter
      })
      .filter((task) => {
        // title filter / startsWith
        return task.title.toLowerCase().startsWith(filters.title.toLowerCase());
      })
      .filter((task) => {
        // name filter
        const userName = getOwnerNameByUserId(task.userId);
        if (userName == undefined) {
          return true;
        } else {
          return userName.toLowerCase().includes(filters.owner.toLowerCase());
        }
      });

    setFilteredTasks(filteredTasks);
  }, [tasks, userNames, filters.status, filters.title, filters.owner]);

  const handleStatusChange = (taskId) => {
    // Find the task by ID
    const updatedTasks = [...filteredTasks];
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);

    const updatedContext = (taskToUpdate.completed = !taskToUpdate.completed);
    updateTask(taskId, updatedContext);
    setFilteredTasks(updatedTasks);
  };
  const hasActiveFilters =
    filters.status !== 'all' || filters.title !== '' || filters.owner !== '';
  const thStyle = `sm:px-6 sm:py-3 px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`;
  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-600">
        Tasks
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row mx-5 sm:mx-[3rem] gap-3 sm:gap-10">
        <TaskFilters
          filters={filters}
          filterType={'title'}
          setFilters={setFilters}
          placeholder={'Title Filter'}
        />
        <TaskFilters
          filters={filters}
          filterType={'owner'}
          setFilters={setFilters}
          placeholder={'User/Owner Filter'}
        />
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
        <div className="w-[200px] h-[30px]">
          {hasActiveFilters && (
            <button
              className={` border-rose-100 border-2 hover:text-rose-500 hover:bg-rose-200 p-2 px-5 rounded-md`}
              onClick={() =>
                setFilters({ status: 'all', title: '', owner: '' })
              }
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      {/* Task list */}
      <table className="md:table-header-group w-screen">
        <thead>
          <tr>
            <th className={thStyle}>Id</th>
            <th className={thStyle}>Title</th>
            <th className={thStyle}>Owner</th>
            <th className={thStyle}>Status</th>
            <th className={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody className=" w-[375px]  sm:table-body-group sm:w-screen">
          {paginatedTasks.map((task) => {
            const userName = getOwnerNameByUserId(task.userId);

            return (
              <Task
                key={task.id}
                task={task}
                userName={userName}
                onStatusChange={handleStatusChange}
              />
            );
          })}
        </tbody>
      </table>

      {filteredTasks.length == 0 && (
        <NoMoreRecords text={'There is no more tasks found'} />
      )}
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        filteredTasks={filteredTasks}
        pageSize={pageSize}
      />
    </section>
  );
};

export default TaskList;
