import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const fetchMock = vi.fn(() => ({
  ok: true,
  status: 200,
  json: () => ({ results: [] }),
}));

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
});
