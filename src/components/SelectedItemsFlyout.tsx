'use client';

import './SelectedItemsFlyout.css';
import {
  useSelectedStore,
  selectSelectedItems,
  selectSelectedCount,
} from '../store/selectedStore';

export default function SelectedItemsFlyout() {
  const selectedItems = useSelectedStore(selectSelectedItems);
  const count = useSelectedStore(selectSelectedCount);
  const unselectAll = useSelectedStore((state) => state.unselectAll);

  if (count === 0) return null;

  return (
    <div className="flyout">
      <div className="flyout__content">
        <span className="flyout__count">
          {count} {count === 1 ? 'item' : 'items'} selected
        </span>

        <div className="flyout__actions">
          <button
            type="button"
            className="button button--secondary"
            onClick={unselectAll}
          >
            Unselect all
          </button>

          <form action="/api/csv" method="POST" style={{ display: 'inline' }}>
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(selectedItems)}
            />
            <button type="submit" className="button">
              Download
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
