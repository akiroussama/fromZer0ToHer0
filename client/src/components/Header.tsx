import { NavLink } from 'react-router-dom';
import React from 'react';
import './Header.css';
export default function Header() {
  return (
    <>
      <h1>📕 Wilders Book</h1>
      <nav>
        <NavLink to={'/'}>All Wilders</NavLink>
        <NavLink to={'/wilders/:id'}>Wilder details</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
      </nav>
    </>
  );
}
