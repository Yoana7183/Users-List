import React, { useContext, useState, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import Task from './Task';
import Pagination from './Pagination';
import useManageTaskAPI_request from '../hooks/useManageTaskAPI_request';
import NoMoreRecords from './NoMoreRecords';
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
    console.log(updatedContext);
    updateTask(taskId, updatedContext);
    setFilteredTasks(updatedTasks);
  };

  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-600">
        Tasks
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row sm:mx-[3rem] gap-4">
        <input
          type="text"
          placeholder="Title Filter"
          value={filters.title}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, title: e.target.value }))
          }
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Owner Filter"
          value={filters.owner}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, owner: e.target.value }))
          }
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
      </div>

      {/* Task list */}

      <table className=" table-header-group w-screen">
        <thead>
          <tr>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Owner</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
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
