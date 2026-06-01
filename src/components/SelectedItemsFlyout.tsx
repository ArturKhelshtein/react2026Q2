import './SelectedItemsFlyout.css';
import {
  useSelectedStore,
  selectSelectedItems,
  selectSelectedCount,
} from '../store/selectedStore';
import type { AppItem } from '../types';

interface SelectedItemsFlyoutProps {
  onDownload: (items: AppItem[]) => void;
}

export default function SelectedItemsFlyout({
  onDownload,
}: SelectedItemsFlyoutProps) {
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
          <button className="button button--secondary" onClick={unselectAll}>
            Unselect all
          </button>

          <button
            className="button"
            onClick={() => {
              onDownload(selectedItems);
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
