import './Item.css';

interface ItemProps {
  name: string;
  description: string;
}

function Item({ name, description }: ItemProps) {
  return (
    <li className="item">
      <h3>{name}</h3>
      <p>{description}</p>
    </li>
  );
}

export default Item;
