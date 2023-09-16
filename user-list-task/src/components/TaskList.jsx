import React, { useContext, useState, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import Task from './Task';
import Pagination from './Pagination';
const TaskList = () => {
  const { tasks, userNames } = useContext(UserListContext);
  console.log(tasks);
  // State variables
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [titleFilter, setTitleFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
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
    const filtered = tasks
      .filter((task) => {
        //  status filter
        if (statusFilter === 'completed') {
          return task.completed;
        } else if (statusFilter === 'notCompleted') {
          return !task.completed;
        }
        return true; // 'all' status filter
      })
      .filter((task) => {
        // title filter
        return task.title.includes(titleFilter.toLowerCase());
      })
      .filter((task) => {
        // name filter
        const userName = getOwnerNameByUserId(task.userId);
        if (userName == undefined) {
          return;
        } else {
          userName.toLowerCase().includes(ownerFilter.toLowerCase());
          return userName;
        }
      });

    setFilteredTasks(filtered);
  }, [tasks, userNames, statusFilter, titleFilter, ownerFilter]);

  // Handle task status change
  const handleStatusChange = (taskId) => {
    // Find the task by ID
    const updatedTasks = [...tasks];
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);

    // Toggle the completed status
    taskToUpdate.completed = !taskToUpdate.completed;

    // Update the context or make an API request to persist the change
    // You may need to implement this part depending on your data source

    // Update the state
    setFilteredTasks(updatedTasks);
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row sm:mx-[3rem] gap-4">
        <input
          type="text"
          placeholder="Title Filter"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Owner Filter"
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>

      {/* Task list */}
      <table className="table-auto w-[95%]">
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
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        filteredTasks={filteredTasks}
        pageSize={pageSize}
      />
    </div>
  );
};

export default TaskList;
