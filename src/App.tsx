import { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

type AppItem = {
  name: string;
  description: string;
};

type AppProps = Record<string, never>;
type AppState = {
  items: AppItem[];
};

class App extends Component<AppProps, AppState> {
  state: AppState = {
    items: [
      { name: 'bulbasaur', description: 'Pokemon description' },
      { name: 'ivysaur', description: 'Pokemon description' },
    ],
  };

  render() {
    const { items } = this.state

    return (
      <div className="app">
        <AppHeader />
        <AppMain items={items} />
      </div>
    );
  }
}

export default App;
