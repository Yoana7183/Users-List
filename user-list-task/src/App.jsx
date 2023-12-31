import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserListTaskMainPage from './UserListTaskMainPage';

import Loading from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';

const TasksPageLazyLoading = lazy(() => import('./pages/TasksPage'));
const UserPostLazyLoading = lazy(() => import('./pages/UserPostPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserListTaskMainPage />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: 'user/posts/:userId',
        element: (
          <Suspense fallback={<Loading />}>
            <UserPostLazyLoading />
          </Suspense>
        ),
      },
      {
        path: '/todos',
        element: (
          <Suspense fallback={<Loading />}>
            <TasksPageLazyLoading />
          </Suspense>
        ),
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
