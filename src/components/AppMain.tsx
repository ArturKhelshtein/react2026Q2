import './AppMain.css';
import Results from './Results';

interface ResultItem {
  id: number;
  name: string;
  description: string;
}

interface AppMainProps {
  items: ResultItem[];
  loading: boolean;
  error: string | null;
  onItemClick?: (id: number) => void;
  selectedId?: number | null;
}

export default function AppMain({
  items,
  loading,
  error,
  onItemClick,
  selectedId,
}: AppMainProps) {
  return (
    <main className="app__main">
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <Results
          items={items}
          onItemClick={onItemClick}
          selectedId={selectedId}
        />
      )}
    </main>
  );
}
