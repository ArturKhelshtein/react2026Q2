import { Component } from 'react';
import './Item.css';

type ItemProps = {
  name: string;
  description: string;
};

class Item extends Component<ItemProps> {
  render() {
    const { name, description } = this.props;

    return (
      <li className="item">
        <h3>{name}</h3>
        <p>{description}</p>
      </li>
    );
  }
}

export default Item;
