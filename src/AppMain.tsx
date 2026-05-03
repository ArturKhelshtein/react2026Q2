import { Component } from 'react';
import './AppMain.css';
import Results from './Results';

type ResultItem = {
  name: string;
  description: string;
};

type AppMainProps = {
  items: ResultItem[];
  loading: boolean;
  error: string | null;
};

class AppMain extends Component<AppMainProps> {
  render() {
    const { items, loading, error } = this.props;

    return (
      <main className="app__main">
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && <Results items={items} />}
      </main>
    );
  }
}

export default AppMain;
