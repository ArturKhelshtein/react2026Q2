import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders label', () => {
    render(<Button label="Search" />);

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button label="Test" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: /test/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('uses button type by default', () => {
    render(<Button label="Default" />);

    expect(screen.getByRole('button', { name: /default/i })).toHaveAttribute(
      'type',
      'button'
    );
  });
});
