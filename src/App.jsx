import { Routes, Route } from 'react-router';
import { Home, AboutUs, Products, NotFound } from '@/pages';
import { RootLayout } from '@/layouts';

export function App() {
  return (
    <Routes>
      <Route Component={RootLayout}>
        <Route index element={<Home />} />

        <Route path='chi-siamo' element={<AboutUs />} />
        <Route path='prodotti' element={<Products />} />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
