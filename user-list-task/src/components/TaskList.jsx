import React, { useContext, useState, useEffect } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import Task from './Task';

const TaskList = () => {
  const { tasks, userNames } = useContext(UserListContext);
  console.log(tasks);
  // State variables
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', or 'notCompleted'
  const [titleFilter, setTitleFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const pageSize = 10;

  const getOwnerNameByUserId = (userId) => {
    const user = userNames.find((user) => user.id === userId);
    return user ? user.name : '';
  };

  useEffect(() => {
    // Filter tasks based on filters and user names
    const filtered = tasks
      .filter((task) => {
        // Apply status filter
        if (statusFilter === 'completed') {
          return task.completed;
        } else if (statusFilter === 'notCompleted') {
          return !task.completed;
        }
        return true; // 'all' status filter
      })
      .filter((task) => {
        // Apply title filter
        return task.title.toLowerCase().includes(titleFilter.toLowerCase());
      })
      .filter((task) => {
        return getOwnerNameByUserId(task.userId)
          .toLowerCase()
          .includes(ownerFilter.toLowerCase());
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

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  return (
    <div>
      {/* Filters */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title Filter"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner Filter"
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>

      {/* Task list */}
      <table className="table-auto">
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
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

      {/* Pagination */}
      <div className="mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {Math.ceil(filteredTasks.length / pageSize)}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= filteredTasks.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
