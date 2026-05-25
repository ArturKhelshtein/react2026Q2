import './Results.css';
import Item from './Item';
import { useSelectedStore } from '../store/selectedStore';
import type { AppItem } from '../types';

interface ResultsProps {
  items: AppItem[];
  onItemClick?: (id: number) => void;
}

export default function Results({ items, onItemClick }: ResultsProps) {
  const { toggleItem, isSelected } = useSelectedStore();

  return (
    <section className="results">
      <ul className="results__list">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            isSelected={isSelected(item.id)}
            onToggle={() => {
                toggleItem(item)}
            }
            onOpenDetails={() => onItemClick?.(item.id)}
          />
        ))}
      </ul>
    </section>
  );
}
