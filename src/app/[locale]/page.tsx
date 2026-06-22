import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main style={{ textAlign: 'center', padding: '40px' }}>
      <h1>{t('title')}</h1>
      <p>test_test</p>
    </main>
  );
}