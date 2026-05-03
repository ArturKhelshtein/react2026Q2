import { Component } from 'react';
import './AppMain.css';
import Results from './Results';
import TestError from './TestError';

type ResultItem = {
  name: string;
  description: string;
};

type AppMainProps = {
  items: ResultItem[];
};

class AppMain extends Component<AppMainProps> {
  render() {
    const { items } = this.props;

    return (
      <main className="app__main">
        <TestError />
        <Results items={items} />
      </main>
    );
  }
}

export default AppMain;
