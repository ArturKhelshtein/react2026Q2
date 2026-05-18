import './AppMain.css';
import Results from './Results';

interface ResultItem {
  name: string;
  description: string;
}

interface AppMainProps {
  items: ResultItem[];
  loading: boolean;
  error: string | null;
}

function AppMain({ items, loading, error }: AppMainProps) {
  return (
    <main className="app__main">
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && <Results items={items} />}
    </main>
  );
}

export default AppMain;
