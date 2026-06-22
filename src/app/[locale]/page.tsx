import { getTranslations } from 'next-intl/server';
import { fetchPokemonList } from '@/api/pokemonApi';
import AppMain from '@/components/AppMain';
import { Link } from '@/i18n/routing';

const PAGE_SIZE = 20;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations('HomePage');
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const { items, totalCount } = await fetchPokemonList(page);
  const totalPages = Math.max(1, Math.ceil((totalCount ?? 0) / PAGE_SIZE));

  return (
    <div className="app">
      <h1>{t('title')}</h1>
      <AppMain items={items} loading={false} error={null} />
      {totalPages > 1 && (
        <nav className="pagination">
          {Array.from({ length: totalPages }, (_, i) => {
            const p = i + 1;
            return (
              <Link
                key={p}
                href={{ query: { page: String(p) } }}
                className={
                  p === page ? 'pagination__link--active' : 'pagination__link'
                }
              >
                {p}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
