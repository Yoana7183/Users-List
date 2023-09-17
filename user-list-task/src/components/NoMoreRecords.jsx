import React from 'react';
import PropTypes from 'prop-types';
const NoMoreRecords = ({ text }) => {
  return (
    <section className="flex items-center justify-center text-gray-500 my-28 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M8 12a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm-3-5a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm8 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {text}
    </section>
  );
};
NoMoreRecords.propTypes = {
  text: PropTypes.string,
};

export default NoMoreRecords;
