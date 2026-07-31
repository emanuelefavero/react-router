import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/layouts';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: routes,
  },
]);
