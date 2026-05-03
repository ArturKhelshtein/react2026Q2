import { Component } from 'react';
import './Item.css';

type ItemProps = Record<string, never>;

class Item extends Component<ItemProps> {
  render() {
    return (
      <li className="item">
        <h3>ivysaur</h3>
        <p>Pokemon description</p>
      </li>
    );
  }
}

export default Item;
