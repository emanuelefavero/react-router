import './Header.css';
import { NavLink } from 'react-router';

export const Header = ({ logo, navLinks = [] }) => (
  <header className='header'>
    <div className='container'>
      {logo && <div className='logo font-semibold text-xl'>{logo}</div>}

      {navLinks.length > 0 && (
        <nav aria-label='Main Navigation'>
          <ul className='route-list'>
            {navLinks.map((route) => (
              <li key={route.to}>
                <NavLink to={route.to} className='nav-link'>
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  </header>
);
