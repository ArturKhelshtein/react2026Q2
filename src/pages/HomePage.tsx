import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import './HomePage.css';
import AppHeader from '../components/AppHeader';
import AppMain from '../components/AppMain';
import TestError from '../components/TestError';
import ThrowError from '../components/ThrowError';
import Pagination from '../components/Pagination';
import SelectedItemsFlyout from '../components/SelectedItemsFlyout';
import { downloadSelectedAsCsv } from '../utils/downloadCsv';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePokemonList, usePokemonSearch } from '../hooks/usePokemonQueries.ts';

const STORAGE_KEY = 'pokemonSearch';
const PAGE_SIZE = 20;

export default function HomePage() {
  const [storedQuery, setStoredQuery] = useLocalStorage(STORAGE_KEY, '');
  const [query, setQuery] = useState(storedQuery);
  const [submittedQuery, setSubmittedQuery] = useState(storedQuery);
  const [showError, setShowError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const listQuery = usePokemonList(page);
  const searchQuery = usePokemonSearch(submittedQuery);

  const isSearch = submittedQuery.length > 0;
  const activeQuery = isSearch ? searchQuery : listQuery;

  const { items, totalCount } = activeQuery.data ?? {
    items: [],
    totalCount: null,
  };
  const loading = activeQuery.isLoading;
  const error = activeQuery.error?.message ?? null;

  const navigate = useNavigate();
  const { detailsId } = useParams();
  const openDetails = (id: number) => {
    void navigate(`/details/${String(id)}?page=${String(page)}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === submittedQuery && !error) {
      return;
    }

    const goToPageOne = () => {
      setSearchParams({ page: '1' });
    };

    if (!normalizedQuery) {
      setSubmittedQuery('');
      setStoredQuery('');
      goToPageOne();
      return;
    }

    setSubmittedQuery(normalizedQuery);
    setStoredQuery(normalizedQuery);
    goToPageOne();
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const handleTestError = () => {
    setShowError(true);
  };

  const totalPages = Math.max(1, Math.ceil((totalCount ?? 0) / PAGE_SIZE));
  const showPagination =
    !loading && !error && items.length > 0 && !submittedQuery;

  return (
    <div className="app">
      <AppHeader
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className="home-split">
        <div className="home-split__list">
          <AppMain
            items={items}
            error={error}
            loading={loading}
            onItemClick={openDetails}
          />
          {showPagination && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {detailsId && (
          <aside className="home-split__details">
            <Outlet key={detailsId} />
          </aside>
        )}
      </div>
      <TestError onClick={handleTestError} />
      {showError && <ThrowError />}

      <SelectedItemsFlyout onDownload={downloadSelectedAsCsv} />
    </div>
  );
}
