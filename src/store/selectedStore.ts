import { create } from 'zustand';
import type { AppItem } from '../types';

interface SelectedStore {
  selectedItems: AppItem[];

  toggleItem: (item: AppItem) => void;
  unselectItem: (id: number) => void;
  unselectAll: () => void;
  isSelected: (id: number) => boolean;
  getSelectedCount: () => number;
}

export const useSelectedStore = create<SelectedStore>((set, get) => ({
  selectedItems: [],

  toggleItem: (item: AppItem) => {
    const { selectedItems } = get();
    const isAlreadySelected = selectedItems.some((i) => i.id === item.id);

    if (isAlreadySelected) {
      set({
        selectedItems: selectedItems.filter((i) => i.id !== item.id),
      });
    } else {
      set({
        selectedItems: [...selectedItems, item],
      });
    }
  },

  unselectItem: (id: number) => {
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    }));
  },

  unselectAll: () => {
    set({ selectedItems: [] });
  },

  isSelected: (id: number) => {
    return get().selectedItems.some((item) => item.id === id);
  },

  getSelectedCount: () => {
    return get().selectedItems.length;
  },
}));

export const selectIsItemSelected = (id: number) => (state: SelectedStore) =>
  state.selectedItems.some((item) => item.id === id);

export const selectSelectedCount = (state: SelectedStore) =>
  state.selectedItems.length;

export const selectSelectedItems = (state: SelectedStore) =>
  state.selectedItems;
