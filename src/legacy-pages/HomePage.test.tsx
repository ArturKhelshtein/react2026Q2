import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../test-utils/renderWIthRouter';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';

interface MockResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}

const fetchMock = vi.fn<() => MockResponse>();

const localStorageMock = {
  getItem: vi.fn(() => ''),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

vi.stubGlobal('fetch', fetchMock);
vi.stubGlobal('localStorage', localStorageMock);

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('renders main controls', async () => {
    const { default: HomePage } = await import('./HomePage');

    renderWithRouter(<HomePage />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(
      screen.getByPlaceholderText(/search pokemon by name/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /test error/i })
    ).toBeInTheDocument();
  });

  it('loads initial pokemon list', async () => {
    fetchMock.mockImplementationOnce(() => ({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          results: [
            {
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
            },
          ],
        }),
    }));
    fetchMock.mockImplementationOnce(() => ({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          name: 'pikachu',
          height: 4,
          weight: 60,
        }),
    }));
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /pikachu/i })
      ).toBeInTheDocument();
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });

  it('searches pokemon on submit and stores query', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            results: [],
          }),
      }))
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            name: 'pikachu',
            height: 4,
            weight: 60,
          }),
      }));
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    await user.type(input, 'pikachu');
    await user.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'pokemonSearch',
      'pikachu'
    );
  });

  it('shows not found error on 404 response', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            results: [],
          }),
      }))
      .mockImplementationOnce(() => ({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      }));
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    await user.type(input, 'unknownpokemon');
    await user.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText(/pokemon not found/i)).toBeInTheDocument();
    });
  });

  it('clears search when submitting empty string', async () => {
    const user = userEvent.setup();

    localStorageMock.getItem.mockReturnValueOnce('pikachu');

    fetchMock
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            name: 'pikachu',
            height: 4,
            weight: 60,
          }),
      }))
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            results: [],
          }),
      }));

    const { default: HomePage } = await import('./HomePage');

    renderWithRouter(<HomePage />);

    const input = screen.getByPlaceholderText(/search pokemon by name/i);

    await user.clear(input);
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('pokemonSearch', '');
    expect(input).toHaveValue('');
  });

  it('shows invalid search error on 400 response', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ results: [] }),
      }))
      .mockImplementationOnce(() => ({
        ok: false,
        status: 400,
        json: () => Promise.resolve({}),
      }));

    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);

    await user.type(
      screen.getByPlaceholderText(/search pokemon by name/i),
      'bad'
    );
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid search request/i)).toBeInTheDocument();
    });
  });

  it('shows server error on 500 response', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ results: [] }),
      }))
      .mockImplementationOnce(() => ({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      }));
  
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
  
    await user.type(
      screen.getByPlaceholderText(/search pokemon by name/i),
      'pikachu'
    );
    await user.click(screen.getByRole('button', { name: /search/i }));
  
    await waitFor(() => {
      expect(
        screen.getByText(/server error, please try again later/i)
      ).toBeInTheDocument();
    });
  });

  it('shows error when initial list fetch fails', async () => {
    fetchMock.mockImplementationOnce(() => ({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    }));
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(
        screen.getByText(/server error, please try again later/i)
      ).toBeInTheDocument();
    });
  });

  it('shows failed to load error on unexpected status', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ results: [] }),
      }))
      .mockImplementationOnce(() => ({
        ok: false,
        status: 403,
        json: () => Promise.resolve({}),
      }));
  
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
  
    await user.type(
      screen.getByPlaceholderText(/search pokemon by name/i),
      'x'
    );
    await user.click(screen.getByRole('button', { name: /search/i }));
  
    await waitFor(() => {
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });

  it('shows unknown error when fetch rejects with non-Error', async () => {
    fetchMock.mockRejectedValueOnce('network');
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/unknown error/i)).toBeInTheDocument();
    });
  });

  it('does not refetch when submitting the same query without error', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ results: [] }),
      }))
      .mockImplementationOnce(() => ({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({ name: 'pikachu', height: 4, weight: 60 }),
      }));
  
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(<HomePage />);
  
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    await user.type(input, 'pikachu');
    await user.click(screen.getByRole('button', { name: /search/i }));
  
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
  
    const callsCount = fetchMock.mock.calls.length;
    await user.click(screen.getByRole('button', { name: /search/i }));
  
    expect(fetchMock.mock.calls.length).toBe(callsCount);
  });

  it('shows error boundary after clicking Test Error', async () => {
    const user = userEvent.setup();
    fetchMock.mockImplementationOnce(() => ({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ results: [] }),
    }));
    const { default: HomePage } = await import('./HomePage');
    renderWithRouter(
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    );
    await user.click(screen.getByRole('button', { name: /test error/i }));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
