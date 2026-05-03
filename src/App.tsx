import { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

type PokemonItem = {
  name: string;
  description: string;
};

type AppProps = Record<string, never>;
type AppState = Record<string, never>;

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <AppMain />
      </div>
    );
  }
}

export default App;
