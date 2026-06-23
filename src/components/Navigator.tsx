import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import './Navigator.css';

export default async function Navigator() {
  const t = await getTranslations('Navigation');

  return (
    <nav className="navigator">
      <Link href="/" className="navigator__link">
      {t('home')}
      </Link>
      <Link className="navigator__link" href="/about">{t('about')}</Link>
    </nav>
  );
}
