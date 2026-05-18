import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  it('renders Search component', () => {
    render(<AppHeader value="" onChange={vi.fn()} onSubmit={vi.fn()} />);

    expect(
      screen.getByPlaceholderText(/search pokemon by name/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
