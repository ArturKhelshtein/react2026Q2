import './Results.css';
import Item from './Item';

interface ResultItem {
  id: number;
  name: string;
  description: string;
}

interface ResultsProps {
  items: ResultItem[];
  onItemClick?: (id: number) => void;
  selectedId?: number | null;
}

export default function Results({ items, onItemClick, selectedId }: ResultsProps) {
  return (
    <section className="results">
      <ul className="results__list">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            onClick={onItemClick}
            selectedId={selectedId}
          />
        ))}
      </ul>
    </section>
  );
}

