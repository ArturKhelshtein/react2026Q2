import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SelectedItemsFlyout from './SelectedItemsFlyout';
import { useSelectedStore } from '../store/selectedStore';
import type { AppItem } from '../types';

const item1: AppItem = { id: 1, name: 'Pikachu', description: 'Electric type' };
const item2: AppItem = { id: 2, name: 'Charizard', description: 'Fire type' };

describe('SelectedItemsFlyout', () => {
  const mockOnDownload = vi.fn();

  beforeEach(() => {
    useSelectedStore.getState().unselectAll();
    vi.clearAllMocks();
  });

  it('does not render when no items are selected', () => {
    render(<SelectedItemsFlyout onDownload={mockOnDownload} />);

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders correctly with 1 selected item', () => {
    useSelectedStore.getState().toggleItem(item1);

    render(<SelectedItemsFlyout onDownload={mockOnDownload} />);

    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /unselect all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();
  });

  it('renders correctly with multiple selected items', () => {
    useSelectedStore.getState().toggleItem(item1);
    useSelectedStore.getState().toggleItem(item2);

    render(<SelectedItemsFlyout onDownload={mockOnDownload} />);

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('calls unselectAll when "Unselect all" button is clicked', async () => {
    const user = userEvent.setup();

    useSelectedStore.getState().toggleItem(item1);
    render(<SelectedItemsFlyout onDownload={mockOnDownload} />);

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it('calls onDownload with selected items when Download button is clicked', async () => {
    const user = userEvent.setup();

    useSelectedStore.getState().toggleItem(item1);
    useSelectedStore.getState().toggleItem(item2);

    render(<SelectedItemsFlyout onDownload={mockOnDownload} />);

    await user.click(screen.getByRole('button', { name: /download/i }));

    expect(mockOnDownload).toHaveBeenCalledTimes(1);
    expect(mockOnDownload).toHaveBeenCalledWith([item1, item2]);
  });
});