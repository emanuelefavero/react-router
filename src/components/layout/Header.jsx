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
        <div className='logo font-semibold text-xl'>React Router</div>

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
