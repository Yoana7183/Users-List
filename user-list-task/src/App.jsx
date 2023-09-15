import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserListTask from './UserListTask';
import UserPostPage from './pages/UserPostPage';
import TasksPage from './pages/TasksPage';
const router = createBrowserRouter([
  {
    path: '/user/',
    element: <UserListTask />,
    children: [
      {
        path: '/user/:userId',
        element: <HomePage />,
      },
      {
        path: '/user/posts:userId',
        element: <UserPostPage />,
      },
      {
        path: '/user/todos:userId',
        element: <TasksPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
