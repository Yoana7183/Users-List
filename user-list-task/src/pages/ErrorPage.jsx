import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">
        Oops! An error occurred.
      </h1>
      <p className="text-gray-600 mt-4">Oops! An error occurred</p>
      <Link to="/">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
          Return to Home Page
        </button>
      </Link>
    </section>
  );
};

export default ErrorPage;
