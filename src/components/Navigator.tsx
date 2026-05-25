import { NavLink } from 'react-router-dom';
import './Navigator.css';

export default function Navigator() {
  return (
    <nav className="navigator">
      <NavLink className="navigator__link" to="/" end>
        Home
      </NavLink>
      <NavLink className="navigator__link" to="/about">About</NavLink>
    </nav>
  );
}
