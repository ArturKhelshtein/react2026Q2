import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './legacy-router';

const fetchMock = vi.fn<() => Promise<Response>>();
vi.stubGlobal('fetch', fetchMock);

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity, retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe('AppRouter', () => {
  it('renders HomePage on root route', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ results: [] }),
    } as Response);

    renderWithProviders(<AppRouter />);

    expect(await screen.findByPlaceholderText(/search pokemon by name/i)).toBeInTheDocument();
  });

  it('renders AboutPage on /about route', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { staleTime: Infinity, retry: false },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/about']}>
          <AppRouter />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { staleTime: Infinity, retry: false },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/unknown']}>
          <AppRouter />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });
});