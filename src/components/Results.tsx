import { Component } from 'react';
import './Results.css';
import Item from './Item';

interface ResultItem {
  name: string;
  description: string;
};

interface ResultsProps {
  items: ResultItem[];
};

class Results extends Component<ResultsProps> {
  render() {
    const { items } = this.props;

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
}

export default Results;
