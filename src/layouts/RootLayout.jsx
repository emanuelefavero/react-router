import { Outlet } from 'react-router';
import './RootLayout.css';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { Footer } from '@/components/layout/Footer';

export const RootLayout = () => {
  return (
    <div className='root-layout'>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </div>
  );
};
