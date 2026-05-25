import { type KeyboardEvent } from 'react';
import './Item.css';
import type { AppItem } from '../types';

export default function Item({
  id,
  name,
  description,
  selectedId = null,
  onClick,
}: AppItem) {
  const isSelected = id === selectedId;

  const handleClick = () => {
    onClick?.(id);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(id);
    }
  };

  return (
    <li>
      <button
        className={`item ${isSelected ? 'item--selected' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        type="button"
        tabIndex={0}
      >
        {' '}
        <h3>{name}</h3>
        <p>{description}</p>
      </button>
    </li>
  );
}
