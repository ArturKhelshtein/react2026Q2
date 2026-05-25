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

  const handleCheckboxChange = () => {
    onToggle();
  };

  return (
    <li className={`item ${isSelected ? 'item--selected' : ''}`}>
      <div className="item__checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={handleCheckboxClick}
          aria-label={`Select ${name}`}
        />
      </div>

      <button
        className="item__content"
        onClick={handleContentClick}
        onKeyDown={handleContentKeyDown}
        type="button"
        tabIndex={0}
      >
        <h3>{name}</h3>
        <p>{description}</p>
      </button>
    </li>
  );
}
