import { RouterProvider } from 'react-router';
import { ProductsProvider } from '@/features/products/context/ProductsProvider';
import { router } from './router/router';

export const App = () => (
  <ProductsProvider>
    <RouterProvider router={router} />
  </ProductsProvider>
);
