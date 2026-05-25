import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Item from './Item';

describe('Item', () => {
  const defaultProps = {
    id: 25,
    name: 'Pikachu',
    description: 'Electric type',
    isSelected: false,
    onToggle: vi.fn(),
    onOpenDetails: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders name and description', () => {
    render(<Item {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/electric type/i)).toBeInTheDocument();
  });

  it('adds "item--selected" class when isSelected is true', () => {
    render(<Item {...defaultProps} isSelected={true} />);
    expect(screen.getByRole('listitem')).toHaveClass('item--selected');
  });

  it('does not add "item--selected" class when isSelected is false', () => {
    render(<Item {...defaultProps} isSelected={false} />);
    expect(screen.getByRole('listitem')).not.toHaveClass('item--selected');
  });

    // === Content button ===
  it('calls onOpenDetails when clicking on content', async () => {
    const user = userEvent.setup();
    const onOpenDetails = vi.fn();

    render(<Item {...defaultProps} onOpenDetails={onOpenDetails} />);

    await user.click(screen.getByRole('button'));
    expect(onOpenDetails).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenDetails when pressing Enter on content button', () => {
    const onOpenDetails = vi.fn();
    render(<Item {...defaultProps} onOpenDetails={onOpenDetails} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onOpenDetails).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenDetails when pressing Space on content button', () => {
    const onOpenDetails = vi.fn();
    render(<Item {...defaultProps} onOpenDetails={onOpenDetails} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onOpenDetails).toHaveBeenCalledTimes(1);
  });
  it('does not call onOpenDetails on other keys', () => {
    const onOpenDetails = vi.fn();
    render(<Item {...defaultProps} onOpenDetails={onOpenDetails} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });
    expect(onOpenDetails).not.toHaveBeenCalled();
  });

  // === Checkbox ===
  it('calls onToggle when clicking the checkbox', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<Item {...defaultProps} onToggle={onToggle} />);

    await user.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not call onOpenDetails when clicking the checkbox', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onOpenDetails = vi.fn();

    render(
      <Item
        {...defaultProps}
        onToggle={onToggle}
        onOpenDetails={onOpenDetails}
      />
    );

    await user.click(screen.getByRole('checkbox'));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onOpenDetails).not.toHaveBeenCalled();
  });
});
