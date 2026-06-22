import { Link } from '@/i18n/routing';
import './Navigator.css';

export default function Navigator() {
  return (
    <nav className="navigator">
      <Link href="/" className="navigator__link">
        Home
      </Link>
      <Link className="navigator__link" href="/about">About</Link>
    </nav>
  );
}
