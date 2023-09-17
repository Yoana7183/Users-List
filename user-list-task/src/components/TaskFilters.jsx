import React from 'react';
import PropTypes from 'prop-types';
/**
 * TaskFilters component displays an input field for filtering tasks.
 *
 * This component provides an input field for filtering tasks based on specific criteria,
 * such as title or owner name.
 *
 * @component
 * @param {Object} props.filters - The current filter values.
 * @param {string} props.filterType - The type of filter (e.g., 'title' or 'owner').
 * @param {Function} props.setFilters - Callback function to update filter values.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @returns {JSX.Element} The rendered TaskFilters component.
 */
const TaskFilters = ({ filters, filterType, setFilters, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
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
  placeholder: PropTypes.string,
};

export default TaskFilters;
