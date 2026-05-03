import { Component, type ChangeEvent, type FormEvent } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import TestError from './TestError';
import ThrowError from './ThrowError';

type AppItem = {
  name: string;
  description: string;
};

type AppProps = Record<string, never>;

type AppState = {
  query: string;
  items: AppItem[];
  loading: boolean;
  error: string | null;
  submittedQuery: string;
  showError: boolean;
};

const STORAGE_KEY = 'pokemonSearch';
const API_URL = 'https://pokeapi.co/api/v2';

class App extends Component<AppProps, AppState> {
  state: AppState = {
    query: '',
    items: [],
    loading: false,
    error: null,
    submittedQuery: '',
    showError: false,
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem(STORAGE_KEY) ?? '';

    this.setState(
      {
        query: savedQuery,
        submittedQuery: savedQuery,
      },
      () => {
        void this.loadPokemons(savedQuery);
      }
    );
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  _handleErrorStatus = (status: number) => {
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
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = this.state.query.trim().toLowerCase();

    if (query === this.state.submittedQuery) {
      return;
    }

    if (!query) {
      this.setState({ submittedQuery: '' });
      void this.loadPokemons('');
      localStorage.setItem(STORAGE_KEY, '');
      return;
    }

    this.setState({ submittedQuery: query });
    void this.loadPokemons(query);
    localStorage.setItem(STORAGE_KEY, query);
  };

  loadPokemons = async (query: string) => {
    this.setState({ loading: true, error: null });

    try {
      if (query) {
        const response = await fetch(`${API_URL}/pokemon/${query}`);

        if (!response.ok) {
            this._handleErrorStatus(response.status);
        }

        const details = (await response.json()) as {
          name: string;
          height: number;
          weight: number;
        };

        this.setState({
          items: [
            {
              name: details.name,
              description: `Height: ${details.height}, Weight: ${details.weight}`,
            },
          ],
        });

        return;
      }

      const response = await fetch(`${API_URL}/pokemon?limit=20&offset=0`);

      if (!response.ok) {
        this._handleErrorStatus(response.status);
      }

      const list = (await response.json()) as {
        results: Array<{
          name: string;
          url: string;
        }>;
      };

      const items = await Promise.all(
        list.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          if (!detailsResponse.ok) {
            this._handleErrorStatus(response.status);
          }
          const details = (await detailsResponse.json()) as {
            name: string;
            height: number;
            weight: number;
          };
          return {
            name: details.name,
            description: `Height: ${details.height}, Weight: ${details.weight}`,
          };
        })
      );
      this.setState({ items });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        items: [],
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleTestError = async () => {
    this.setState({ showError: true });
  };

  render() {
    const { query, items, showError } = this.state;

    return (
      <div className="app">
        <AppHeader
          value={query}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <AppMain
          items={items}
          error={this.state.error}
          loading={this.state.loading}
        />
        <TestError onClick={this.handleTestError} />
        {showError && <ThrowError />}
      </div>
    );
  }
}

export default App;
