import type { AppItem } from '../types';
import './AppMain.css';
import Results from './Results';

interface AppMainProps {
  items: AppItem[];
  loading: boolean;
  error: string | null;
  onItemClick?: (id: number) => void;
}

export default function AppMain({
  items,
  loading,
  error,
  onItemClick,
}: AppMainProps) {
  return (
    <main className="app__main">
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <Results items={items} onItemClick={onItemClick} />
      )}
      {!loading && !error && items.length === 0 && <p>No results found</p>}
    </main>
  );
}
