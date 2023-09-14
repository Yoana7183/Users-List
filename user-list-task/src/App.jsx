import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Projects from './pages/Projects';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
