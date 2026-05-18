import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import './HomePage.css';
import AppHeader from '../components/AppHeader';
import AppMain from '../components/AppMain';
import TestError from '../components/TestError';
import ThrowError from '../components/ThrowError';
import Pagination from '../components/Pagination';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppItem {
  name: string;
  description: string;
}

interface FetchResult {
  items: AppItem[];
  totalCount: number | null;
}

const STORAGE_KEY = 'pokemonSearch';
const API_URL = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 20;

function handleErrorStatus(status: number) {
  if (status === 400) {
    throw new Error('Invalid search request');
  }
  if (status === 404) {
    throw new Error('Pokemon not found');
  }
  if (status >= 500) {
    throw new Error('Server error, please try again later');
  }
  throw new Error('Failed to load data');
}

async function fetchPokemons(
  searchQuery: string,
  page: number
): Promise<FetchResult> {
  if (searchQuery) {
    const response = await fetch(`${API_URL}/pokemon/${searchQuery}`);

    if (!response.ok) {
      handleErrorStatus(response.status);
    }

    const details = (await response.json()) as {
      name: string;
      height: number;
      weight: number;
    };

    return {
      items: [
        {
          name: details.name,
          description: `Height: ${String(details.height)}, Weight: ${String(details.weight)}`,
        },
      ],
      totalCount: null,
    };
  }

  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * PAGE_SIZE;

  const response = await fetch(
    `${API_URL}/pokemon?limit=${String(PAGE_SIZE)}&offset=${String(offset)}`
  );

  if (!response.ok) {
    handleErrorStatus(response.status);
  }

  const list = (await response.json()) as {
    count: number;
    results: {
      name: string;
      url: string;
    }[];
  };

  const items = await Promise.all(
    list.results.map(async (pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      if (!detailsResponse.ok) {
        handleErrorStatus(detailsResponse.status);
      }
      const details = (await detailsResponse.json()) as {
        name: string;
        height: number;
        weight: number;
      };
      return {
        name: details.name,
        description: `Height: ${String(details.height)}, Weight: ${String(details.weight)}`,
      };
    })
  );

  return { items, totalCount: list.count };
}

export default function HomePage() {
  const [storedQuery, setStoredQuery] = useLocalStorage(STORAGE_KEY, '');
  const [query, setQuery] = useState(storedQuery);
  const [items, setItems] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState(storedQuery);
  const [showError, setShowError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [totalCount, setTotalCount] = useState(0);

  const loadPokemons = useCallback(
    async (searchQuery: string, pageNumber: number) => {
      setLoading(true);
      setError(null);

      try {
        const { items: data, totalCount: count } = await fetchPokemons(
          searchQuery,
          pageNumber
        );
        setItems(data);
        setTotalCount(count ?? 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setItems([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!searchParams.get('page')) {
      return;
    }

    //eslint-disable-next-line
    void loadPokemons(submittedQuery, page);
  }, [submittedQuery, page, searchParams, loadPokemons]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
const showPagination =
  !loading && !error && items.length > 0 && !submittedQuery;

  return (
    <div className="app">
      <AppHeader
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <AppMain items={items} error={error} loading={loading} />
      {showPagination && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <TestError onClick={handleTestError} />
      {showError && <ThrowError />}
    </div>
  );
}
