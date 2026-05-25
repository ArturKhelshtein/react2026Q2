import { type KeyboardEvent } from 'react';
import './Item.css';
import type { ItemProps } from '../types';

export default function Item({
  name,
  description,
  isSelected,
  onToggle,
  onOpenDetails,
}: ItemProps) {
  const handleContentClick = () => {
    onOpenDetails();
  };

  const handleContentKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpenDetails();
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <li className={`item ${isSelected ? 'item--selected' : ''}`}>
      <button
        className="item__content"
        onClick={handleContentClick}
        onKeyDown={handleContentKeyDown}
        type="button"
      >
        <div className="item__checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            onClick={handleCheckboxClick}
            aria-label={`Select ${name}`}
          />
        </div>
        <h3>{name}</h3>
        <p>{description}</p>
      </button>
    </li>
  );
}
