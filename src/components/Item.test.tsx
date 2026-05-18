import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Item from './Item';

describe('Item', () => {
  it('renders name and description', () => {
    render(<Item name="Pikachu" description="Electric type" />);

    expect(
      screen.getByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/electric type/i)).toBeInTheDocument();
  });
});
