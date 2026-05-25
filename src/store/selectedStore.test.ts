import { beforeEach, describe, expect, it } from 'vitest';
import {
  useSelectedStore,
  selectIsItemSelected,
  selectSelectedCount,
  selectSelectedItems,
} from './selectedStore';
import type { AppItem } from '../types';

const mockItem1: AppItem = { id: 1, name: 'Pikachu', description: 'Electric' };
const mockItem2: AppItem = { id: 2, name: 'Charizard', description: 'Fire' };

describe('selectedStore', () => {
  beforeEach(() => {
    useSelectedStore.getState().unselectAll();
  });

  it('should have empty selectedItems initially', () => {
    expect(useSelectedStore.getState().selectedItems).toEqual([]);
  });

  describe('toggleItem', () => {
    it('adds item when it is not selected', () => {
      const { toggleItem } = useSelectedStore.getState();

      toggleItem(mockItem1);

      expect(useSelectedStore.getState().selectedItems).toContainEqual(
        mockItem1
      );
    });

    it('removes item when it is already selected', () => {
      const { toggleItem } = useSelectedStore.getState();

      toggleItem(mockItem1);
      toggleItem(mockItem1);

      expect(useSelectedStore.getState().selectedItems).not.toContainEqual(
        mockItem1
      );
    });

    it('toggleItem removes item on second call (toggle behaviour)', () => {
        const { toggleItem } = useSelectedStore.getState();
      
        toggleItem(mockItem1);
        expect(useSelectedStore.getState().selectedItems).toHaveLength(1);
      
        toggleItem(mockItem1);
        expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
      });
  });

  describe('unselectItem', () => {
    it('removes item by id', () => {
      const { toggleItem, unselectItem } = useSelectedStore.getState();

      toggleItem(mockItem1);
      toggleItem(mockItem2);
      unselectItem(1);

      const items = useSelectedStore.getState().selectedItems;
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(mockItem2);
    });

    it('does nothing if item is not selected', () => {
      const { unselectItem } = useSelectedStore.getState();

      unselectItem(999);

      expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
    });
  });

  describe('unselectAll', () => {
    it('clears all selected items', () => {
      const { toggleItem, unselectAll } = useSelectedStore.getState();

      toggleItem(mockItem1);
      toggleItem(mockItem2);
      unselectAll();

      expect(useSelectedStore.getState().selectedItems).toEqual([]);
    });
  });

  describe('isSelected', () => {
    it('returns true for selected item', () => {
      const { toggleItem, isSelected } = useSelectedStore.getState();

      toggleItem(mockItem1);

      expect(isSelected(1)).toBe(true);
      expect(isSelected(2)).toBe(false);
    });
  });

  describe('getSelectedCount', () => {
    it('returns correct count of selected items', () => {
      const { toggleItem, getSelectedCount } = useSelectedStore.getState();

      expect(getSelectedCount()).toBe(0);

      toggleItem(mockItem1);
      expect(getSelectedCount()).toBe(1);

      toggleItem(mockItem2);
      expect(getSelectedCount()).toBe(2);

      toggleItem(mockItem1);
      expect(getSelectedCount()).toBe(1);
    });
  });

  describe('selectors', () => {
    it('selectIsItemSelected works correctly', () => {
      const { toggleItem } = useSelectedStore.getState();
      toggleItem(mockItem1);

      const state = useSelectedStore.getState();

      expect(selectIsItemSelected(1)(state)).toBe(true);
      expect(selectIsItemSelected(2)(state)).toBe(false);
    });

    it('selectSelectedCount returns correct length', () => {
      const { toggleItem } = useSelectedStore.getState();
      toggleItem(mockItem1);
      toggleItem(mockItem2);

      const state = useSelectedStore.getState();

      expect(selectSelectedCount(state)).toBe(2);
    });

    it('selectSelectedItems returns the array', () => {
      const { toggleItem } = useSelectedStore.getState();
      toggleItem(mockItem1);

      const state = useSelectedStore.getState();

      expect(selectSelectedItems(state)).toEqual([mockItem1]);
    });
  });
});
