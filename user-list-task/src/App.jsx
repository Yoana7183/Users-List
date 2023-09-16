import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Projects from './pages/Projects';
import HomePage from './pages/HomePage';
import UserListTaskMainPage from './UserListTaskMainPage';
import UserPostPage from './pages/UserPostPage';
import TasksPage from './pages/TasksPage';
import ErrorPage from './pages/ErrorPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserListTaskMainPage />,
    children: [
      { index: true, path: '/', element: <HomePage /> },
      {
        path: 'user/posts/:userId',
        element: <UserPostPage />,
      },
      {
        path: '/todos',
        element: <TasksPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
