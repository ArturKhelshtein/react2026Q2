import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppMain from './components/AppMain';
import TestError from './components/TestError';
import ThrowError from './components/ThrowError';

interface AppItem {
  name: string;
  description: string;
}

const STORAGE_KEY = 'pokemonSearch';
const API_URL = 'https://pokeapi.co/api/v2';
const getSavedQuery = () => localStorage.getItem(STORAGE_KEY) ?? '';

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

async function fetchPokemons(searchQuery: string): Promise<AppItem[]> {
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

    return [
      {
        name: details.name,
        description: `Height: ${String(details.height)}, Weight: ${String(details.weight)}`,
      },
    ];
  }

  const response = await fetch(`${API_URL}/pokemon?limit=20&offset=0`);

  if (!response.ok) {
    handleErrorStatus(response.status);
  }

  const list = (await response.json()) as {
    results: {
      name: string;
      url: string;
    }[];
  };

  return await Promise.all(
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
}

function App() {
  const [query, setQuery] = useState(getSavedQuery);
  const [items, setItems] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState(getSavedQuery);
  const [showError, setShowError] = useState<boolean>(false);

  const loadPokemons = useCallback(async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPokemons(searchQuery);
      setItems(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    void fetchPokemons(getSavedQuery())
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((error: unknown) => {
        if (active) {
          setError(error instanceof Error ? error.message : 'Unknown error');
          setItems([]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === submittedQuery && !error) {
      return;
    }

    if (!normalizedQuery) {
      setSubmittedQuery('');
      void loadPokemons('');
      localStorage.setItem(STORAGE_KEY, '');
      return;
    }

    setSubmittedQuery(normalizedQuery);
    void loadPokemons(normalizedQuery);
    localStorage.setItem(STORAGE_KEY, normalizedQuery);
  };

  const handleTestError = () => {
    setShowError(true);
  };

  return (
    <div className="app">
      <AppHeader
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <AppMain items={items} error={error} loading={loading} />
      <TestError onClick={handleTestError} />
      {showError && <ThrowError />}
    </div>
  );
}

export default App;
