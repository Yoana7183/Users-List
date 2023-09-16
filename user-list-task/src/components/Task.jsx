import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, onStatusChange, userName }) => {
  const handleStatusToggle = () => {
    onStatusChange(task.id);
  };

  return (
    <tr className="hover:shadow-lg border-b border-gray-300 hover:bg-gray-100">
      <td className="py-2 px-4 text-gray-800">{task.title}</td>
      <td className="py-2 px-4 text-gray-800">{userName}</td>
      <td className="py-2 px-4 text-gray-800">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-gray-600 border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:ring-2 focus:ring-blue-400"
          checked={task.completed}
          onChange={handleStatusToggle}
        />
      </td>
      <td className="py-2 px-4 text-gray-800">
        <button
          onClick={handleStatusToggle}
          className="text-gray-800 hover:text-gray-600"
        >
          {task.completed ? 'Undone' : 'Done'}
        </button>
      </td>
    </tr>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

export default Task;
