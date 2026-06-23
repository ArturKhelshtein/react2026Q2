import { getTranslations } from 'next-intl/server';
import { fetchPokemonList, fetchPokemonByName } from '@/api/pokemonApi';
import { Link } from '@/i18n/routing';
import AppMain from '@/components/AppMain';
import Search from '@/components/Search';
import SelectedItemsFlyout from '@/components/SelectedItemsFlyout';

const PAGE_SIZE = 20;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const t = await getTranslations('HomePage');
  const { page: pageParam, query } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let items: { id: number; name: string; description: string }[] = [];
  let totalCount = 0;
  let error: string | null = null;

  try {
    if (query) {
      const result = await fetchPokemonByName(query);
      items = result.items;
      totalCount = result.items.length;
    } else {
      const result = await fetchPokemonList(page);
      items = result.items;
      totalCount = result.totalCount ?? 0;
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="app">
      <h1>{t('title')}</h1>
      <Search />
      <AppMain items={items} loading={false} error={error} />
      {!query && totalPages > 1 && (
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
      <SelectedItemsFlyout />
    </div>
  );
}
