import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pagination component for navigating between pages of tasks.
 *
 * This component provides buttons to navigate between pages of tasks based on the current page
 * and the total number of pages.
 *
 * @component
 * @param {Function} props.setCurrentPage - Callback function to set the current page.
 * @param {number} props.currentPage - The current page number.
 * @param {Array} props.filteredTasks - The array of tasks to be paginated.
 * @param {number} props.pageSize - The number of tasks to display per page.
 * @returns {JSX.Element} The rendered Pagination component.
 */
const Pagination = ({
  setCurrentPage,
  currentPage,
  filteredTasks,
  pageSize,
}) => {
  return (
    <div className="mt-4 flex justify-center space-x-8">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-600 text-lg">
        {currentPage} / {Math.ceil(filteredTasks.length / pageSize)}
      </span>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= Math.ceil(filteredTasks.length / pageSize)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
  filteredTasks: PropTypes.array,
  pageSize: PropTypes.number,
};
