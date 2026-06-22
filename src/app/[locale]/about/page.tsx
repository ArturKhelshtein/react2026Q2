import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');

  return (
    <main className="about">
      <h1>{t('title')}</h1>
      <p>{t('author')}</p>
      <p>
      {t('course')}{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          {t('courseLink')}
        </a>
      </p>
      <Link href="/">{t('backToHome')}</Link>
    </main>
  );
}
