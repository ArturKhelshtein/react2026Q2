import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>{t('message')}</p>
      <Link href="/">{t('backToHome')}</Link>
    </main>
  );
}
