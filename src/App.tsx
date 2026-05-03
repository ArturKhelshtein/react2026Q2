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
    void this.loadPokemons('');
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
      const url = query
        ? `${API_URL}/pokemon/${query.toLowerCase()}`
        : `${API_URL}/pokemon?limit=20&offset=0`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to load data');
      }

      const data = await response.json();
      this.setState({
        items: query
          ? [
              {
                name: data.name,
                description: 'Description later',
              },
            ]
          : data.results.map((item: { name: string; url: string }) => ({
              name: item.name,
              description: 'Description later',
            })),
      });
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
        <AppMain items={items} />
      </div>
    );
  }
}

export default App;
