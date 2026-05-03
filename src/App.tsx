import { Component, type ChangeEvent, type FormEvent } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

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

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = this.state.query.trim().toLowerCase();

    if (query === this.state.submittedQuery) {
      return;
    }

    if (!query) {
      this.setState({ submittedQuery: '' });
      void this.loadPokemons('');
      return;
    }

    this.setState({ submittedQuery: query });
    void this.loadPokemons(query);
  };

  loadPokemons = async (query: string) => {
    this.setState({ loading: true, error: null });

    try {
      if (query) {
        const response = await fetch(`${API_URL}/pokemon/${query}`);

        if (!response.ok) {
          throw new Error('Failed to load data');
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
        throw new Error('Failed to load data');
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
            throw new Error('Failed to load data');
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

  render() {
    const { query, items } = this.state;

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
      </div>
    );
  }
}

export default App;
