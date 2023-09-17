import React from 'react';
import PropTypes from 'prop-types';
const TaskFilters = ({ filters, filterType, setFilters }) => {
  return (
    <input
      type="text"
      placeholder="Title Filter"
      value={filters[filterType]}
      onChange={(e) =>
        setFilters((prev) => ({ ...prev, [filterType]: e.target.value }))
      }
      className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
    />
  );
};
TaskFilters.propTypes = {
  filters: PropTypes.object,
  filterType: PropTypes.string,
  setFilters: PropTypes.func,
};

export default TaskFilters;
