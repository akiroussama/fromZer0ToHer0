import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Import the CSS file

export default function Header() {
  return (
    <header>
      <h1>Wilder BOOK 📕</h1>
      <nav>
        <NavLink exact to={'/'} activeClassName='active'>
          {' '}
          ALL WILDERS{' '}
        </NavLink>
        <NavLink to={'/wilders/:id'} activeClassName='active'>
          {' '}
          Wilder details{' '}
        </NavLink>
        <NavLink to={'/login'} activeClassName='active'>
          {' '}
          Login{' '}
        </NavLink>
      </nav>
    </header>
  );
}
