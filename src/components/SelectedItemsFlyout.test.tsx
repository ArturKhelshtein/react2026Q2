import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SelectedItemsFlyout from './SelectedItemsFlyout';
import { useSelectedStore } from '../store/selectedStore';
import type { AppItem } from '../types';

const item1: AppItem = { id: 1, name: 'Pikachu', description: 'Electric type' };
const item2: AppItem = { id: 2, name: 'Charizard', description: 'Fire type' };

describe('SelectedItemsFlyout', () => {
  beforeEach(() => {
    useSelectedStore.getState().unselectAll();
  });

  it('does not render when no items are selected', () => {
    render(<SelectedItemsFlyout />);

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /unselect all/i })
    ).not.toBeInTheDocument();
  });

  it('renders correctly with 1 selected item', () => {
    useSelectedStore.getState().toggleItem(item1);

    render(<SelectedItemsFlyout />);

    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
  });

  it('renders correctly with multiple selected items', () => {
    useSelectedStore.getState().toggleItem(item1);
    useSelectedStore.getState().toggleItem(item2);

    render(<SelectedItemsFlyout />);

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('hides itself after clicking "Unselect all"', async () => {
    const user = userEvent.setup();

    useSelectedStore.getState().toggleItem(item1);
    render(<SelectedItemsFlyout />);

    expect(screen.getByText('1 item selected')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it('calls unselectAll when button is clicked', async () => {
    const user = userEvent.setup();
    const unselectAllSpy = vi.fn<() => void>();

    useSelectedStore.setState({ unselectAll: unselectAllSpy });

    useSelectedStore.getState().toggleItem(item1);
    render(<SelectedItemsFlyout />);

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(unselectAllSpy).toHaveBeenCalledTimes(1);
  });
});
