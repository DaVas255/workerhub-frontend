import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { HomePage } from '@/pages/HomePage/HomePage';
import { AuthPage } from '@/pages/AuthPage/AuthPage';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';
import { OrdersPage } from '@/pages/OrdersPage/OrdersPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/orders',
    element: <OrdersPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);

export const App = () => {
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}