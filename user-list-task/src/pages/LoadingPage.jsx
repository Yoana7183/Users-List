import React from 'react';

const Loading = () => {
  return (
    <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
      <svg
        className="animate-spin h-16 w-16 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.18 8.009l2.82-2.72z"
        ></path>
      </svg>
    </section>
  );
};

export default Loading;
