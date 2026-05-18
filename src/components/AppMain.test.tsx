import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AppMain from './AppMain';

describe('AppMain', () => {
  it('renders loading state', () => {
    render(<AppMain items={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<AppMain items={[]} loading={false} error="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders results when not loading and no error', () => {
    render(
      <AppMain
        items={[{ name: 'Pikachu', description: 'Electric type', id: 25 }]}
        loading={false}
        error={null}
      />
    );
    expect(
      screen.getByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/electric type/i)).toBeInTheDocument();
  });
});
