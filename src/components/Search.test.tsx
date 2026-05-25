import { useState, type ChangeEvent, type SubmitEvent  } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Search from './Search';

function SearchHarness() {
  const [value, setValue] = useState('');
  const handleSubmit = vi.fn((event: SubmitEvent <HTMLFormElement>) => {
    event.preventDefault();
  });
  return (
    <Search
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      onSubmit={handleSubmit}
    />
  );
}

describe('Search', () => {
  it('renders input and submit button', () => {
    render(<Search value="" onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(
      screen.getByPlaceholderText(/search pokemon by name/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value and submits the form', async () => {
    const user = userEvent.setup();
    render(<SearchHarness />);
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    await user.type(input, 'pikachu');
    expect(input).toHaveValue('pikachu');
    await user.click(screen.getByRole('button', { name: /search/i }));
  });
});
