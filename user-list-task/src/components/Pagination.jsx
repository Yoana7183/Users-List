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
  const buttonsStyle = `text-gray-600 text-lg mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300`;
  return (
    <div className="mt-4 flex justify-center">
      <button
        className={buttonsStyle}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className={buttonsStyle}>
        {currentPage} / {Math.ceil(filteredTasks.length / pageSize)}
      </span>
      <button
        className={buttonsStyle}
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
  filteredTasks: PropTypes.any,
  pageSize: PropTypes.number,
};
