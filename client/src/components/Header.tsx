import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Import the CSS file

export default function Header() {
  return (
    <header>
      <h1>Wilder BOOK 📕</h1>
      <nav>
        <NavLink
          to={'/home'}
          className={(navData) => (navData.isActive ? 'active' : '')}
        >
          {' '}
          ALL WILDERS{' '}
        </NavLink>
        <NavLink
          to={'/wilders/:id'}
          className={(navData) => (navData.isActive ? 'active' : '')}
        >
          {' '}
          Wilder details{' '}
        </NavLink>
        <NavLink
          to={'/login'}
          className={(navData) => (navData.isActive ? 'active' : '')}
        >
          {' '}
          Login{' '}
        </NavLink>
      </nav>
    </header>
  );
}
