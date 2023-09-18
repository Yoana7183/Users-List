import React from 'react';
import PropTypes from 'prop-types';
/**
 * Task component displays a single task with title, owner, status, and action buttons.
 *
 * This component renders a single task with its title, owner, and a checkbox to toggle the status.
 * It also includes a button to change the task status (Done or Undone).
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.task - The task object to display.
 * @param {Function} props.onStatusChange - Callback function to handle status change.
 * @param {string} [props.userName] - The name of the task owner (optional).
 * @returns {JSX.Element} The rendered Task component.
 */

const Task = ({ task, onStatusChange, userName }) => {
  const handleStatusToggle = () => {
    onStatusChange(task.id);
  };

  return (
    <tr className="hover:shadow-lg border-b border-gray-300 hover:bg-gray-100">
      <td className="py-2 px-4 text-gray-800">{task.id}</td>
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
          className={`text-white ${
            task.completed
              ? 'bg-teal-400 hover:bg-teal-600'
              : 'bg-rose-400 hover:bg-rose-600'
          } py-2 px-4 rounded`}
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
