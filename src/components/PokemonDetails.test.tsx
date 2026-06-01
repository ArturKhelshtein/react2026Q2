import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonDetails from './PokemonDetails';

const fetchMock = vi.fn<() => Promise<Response>>();
vi.stubGlobal('fetch', fetchMock);

const TestWrapper = ({ initialEntry = '/details/25?page=2' }: { initialEntry?: string }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/details/:detailsId" element={<PokemonDetails />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    fetchMock.mockImplementation(() => new Promise(() => {
      // never resolves to keep loading state
    }));
    render(<TestWrapper />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders pokemon name and sprite after loading', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          name: 'pikachu',
          sprites: {
            other: {
              dream_world: { front_default: 'https://example.com/pikachu.svg' },
            },
          },
        }),
    } as Response);

    render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('img', { name: /pikachu/i })).toHaveAttribute(
      'src',
      'https://example.com/pikachu.svg'
    );
  });

  it('does not render image when sprite is null', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          name: 'mew',
          sprites: {
            other: {
              dream_world: { front_default: null },
            },
          },
        }),
    } as Response);

    render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /mew/i })).toBeInTheDocument();
    });

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('navigates home with page query when close is clicked', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          name: 'bulbasaur',
          sprites: {
            other: {
              dream_world: { front_default: 'https://example.com/bulbasaur.svg' },
            },
          },
        }),
    } as Response);

    render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Failed to fetch details'));
    render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch details/i)).toBeInTheDocument();
    });
  });
});