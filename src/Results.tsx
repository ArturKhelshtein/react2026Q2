import { Component } from 'react';
import './Results.css';
import Item from './Item';

type ResultsProps = Record<string, never>

class Results extends Component<ResultsProps> {
  render() {
    return (
      <section className="results">
        <ul className="results__list">
          <Item />
          <Item />
        </ul>
      </section>
    );
  }
}

export default Results;
