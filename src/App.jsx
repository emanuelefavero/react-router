import { Routes, Route } from 'react-router';
import { Home, AboutUs, Products, Product, NotFound } from '@/pages';
import { RootLayout } from '@/layouts';

export function App() {
  return (
    <Routes>
      <Route Component={RootLayout}>
        <Route index element={<Home />} />

        <Route path='about-us' element={<AboutUs />} />
        <Route path='products'>
          <Route index element={<Products />} />
          <Route path=':productId' element={<Product />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
