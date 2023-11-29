import { NavLink } from 'react-router-dom';
export default function Header() {
  return (
    <header>
      <h1>Wilder BOOK 📕</h1>
      <nav>
        <NavLink to={'/'}> ALL WILDERS </NavLink>
        <NavLink to={'/wilders/:id'}> Wilder details </NavLink>
      </nav>
    </header>
  );
}
