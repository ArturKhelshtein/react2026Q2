import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; rest: string[] }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NotFound' });

  return (
    <main className="not-found">
      <h1>404</h1>
      <p>{t('message')}</p>
      <Link href="/">{t('backToHome')}</Link>
    </main>
  );
}

export function generateStaticParams() {
  return [];
}
