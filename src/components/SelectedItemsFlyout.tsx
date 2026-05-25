import './SelectedItemsFlyout.css';
import { useSelectedStore, selectSelectedCount } from '../store/selectedStore';

export default function SelectedItemsFlyout() {
  const count = useSelectedStore(selectSelectedCount);
  const unselectAll = useSelectedStore((state) => state.unselectAll);

  if (count === 0) return null;

  return (
    <div className="flyout">
      <div className="flyout__content">
        <span className="flyout__count">
          {count} {count === 1 ? 'item' : 'items'} selected
        </span>

        <button className="button button--secondary" onClick={unselectAll}>
          Unselect all
        </button>
      </div>
    </div>
  );
}
