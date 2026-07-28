import './Header.css';
import { NavLink } from 'react-router';

const routes = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/chi-siamo',
    label: 'Chi Siamo',
  },
  {
    to: '/prodotti',
    label: 'Prodotti',
  },
];

export const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <h1 className='font-semibold text-4xl'>React Router</h1>

        <nav aria-label='Main Navigation'>
          <ul className='route-list'>
            {routes.map((route) => (
              <li key={route.to}>
                <NavLink to={route.to} className='link'>
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
