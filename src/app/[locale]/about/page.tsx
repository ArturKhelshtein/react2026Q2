import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');
  return (
    <main style={{ padding: '40px' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
