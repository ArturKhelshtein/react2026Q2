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
};

const initialItems: AppItem[] = [
  { name: 'bulbasaur', description: 'Pokemon description' },
  { name: 'ivysaur', description: 'Pokemon description' },
  { name: 'charmander', description: 'Pokemon description' },
];

class App extends Component<AppProps, AppState> {
  state: AppState = {
    query: '',
    items: initialItems,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = this.state.query.trim().toLowerCase();
    if (!query) {
      this.setState({ items: initialItems });
      return;
    }
    this.setState({
      items: initialItems.filter((item) =>
        item.name.toLowerCase().includes(query)
      ),
    });
  };

  render() {
    const { query, items } = this.state

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
