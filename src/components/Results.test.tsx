import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Results from './Results';

describe('Results', () => {
  it('renders all items', () => {
    render(
      <Results
        items={[
          { name: 'Pikachu', description: 'Electric type' },
          { name: 'Bulbasaur', description: 'Grass type' },
        ]}
      />
    );

    const items = screen.getAllByRole('listitem');

    expect(within(items[0]).getByText(/pikachu/i)).toBeInTheDocument();
    expect(within(items[1]).getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(within(items[0]).getByText(/electric type/i)).toBeInTheDocument();
    expect(within(items[1]).getByText(/grass type/i)).toBeInTheDocument();
  });

  it('renders empty list without items', () => {
    render(<Results items={[]} />);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
