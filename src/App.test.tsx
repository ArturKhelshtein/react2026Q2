import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('renders main controls', async () => {
    const { default: App } = await import('./App');

    render(<App />);

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
    const { default: App } = await import('./App');
    render(<App />);
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
    const { default: App } = await import('./App');
    render(<App />);
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
    const { default: App } = await import('./App');
    render(<App />);
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
  
    const { default: App } = await import('./App');
  
    render(<App />);
  
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
});
