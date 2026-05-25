import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Item from './Item';

describe('Item', () => {
  it('renders name and description', () => {
    render(<Item id={25} name="Pikachu" description="Electric type" />);

    expect(
      screen.getByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/electric type/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Item id={25} name="Pikachu" description="Electric type" onClick={onClick} />);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(25);
  });

  it('applies selected class when selectedId matches id', () => {
    render(<Item id={25} name="Pikachu" description="Electric type" selectedId={25} />);
    expect(screen.getByRole('button')).toHaveClass('item--selected');
  });

  it('does not apply selected class when selectedId does not match', () => {
    render(<Item id={25} name="Pikachu" description="Electric type" selectedId={10} />);
    expect(screen.getByRole('button')).not.toHaveClass('item--selected');
  });

  it('calls onClick when Enter is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Item id={25} name="Pikachu" description="Electric type" onClick={onClick} />);

    await user.type(screen.getByRole('button'), '{enter}');
    expect(onClick).toHaveBeenCalledWith(25);
  });

  it('calls onClick when Space is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Item id={25} name="Pikachu" description="Electric type" onClick={onClick} />);

    await user.type(screen.getByRole('button'), ' ');
    expect(onClick).toHaveBeenCalledWith(25);
  });

  it('does not call onClick on other keys', () => {
    const onClick = vi.fn();
    render(<Item id={25} name="Pikachu" description="Electric type" onClick={onClick} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });
    expect(onClick).not.toHaveBeenCalled();
  });
});
