import { Component } from 'react';
import './AppMain.css';
import Results from './Results';
import TestError from './TestError';

type AppMainProps = Record<string, never>;

class AppMain extends Component<AppMainProps> {
  render() {
    return (
      <main className="app__main">
        <TestError />
        <Results />
      </main>
    );
  }
}

export default AppMain;