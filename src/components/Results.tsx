import './Results.css';
import Item from './Item';

interface ResultItem {
  name: string;
  description: string;
}

interface ResultsProps {
  items: ResultItem[];
}

function Results({ items }: ResultsProps) {
  return (
    <section className="results">
      <ul className="results__list">
        {items.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
}

export default Results;
