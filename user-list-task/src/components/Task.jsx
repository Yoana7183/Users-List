import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, onStatusChange, userName }) => {
  const handleStatusToggle = () => {
    // Call the onStatusChange callback with the task ID to toggle its status
    onStatusChange(task.userId);
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>{userName}</td>
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleStatusToggle}
        />
      </td>
      <td>
        <button onClick={handleStatusToggle}>Toggle</button>
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
