import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

const localStorageMock = {
  getItem: vi.fn(() => ''),
  setItem: vi.fn(),
};

vi.stubGlobal('localStorage', localStorageMock);

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('');
  });

  it('returns initial value when key is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', ''));
    expect(result.current[0]).toBe('');
  });

  it('reads value from localStorage on init', () => {
    localStorageMock.getItem.mockReturnValueOnce('pikachu');
    const { result } = renderHook(() => useLocalStorage('pokemonSearch', ''));
    expect(result.current[0]).toBe('pikachu');
  });

  it('updates value and calls setItem', () => {
    const { result } = renderHook(() => useLocalStorage('pokemonSearch', ''));

    act(() => {
      result.current[1]('pikachu');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'pokemonSearch',
      'pikachu'
    );
    expect(result.current[0]).toBe('pikachu');
  });

  it('returns initialValue when getItem throws', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    const { result } = renderHook(() => useLocalStorage('testKey', 'fallback'));

    expect(result.current[0]).toBe('fallback');
  });

  it('returns initialValue when getItem returns null', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('logs error and does not update state when setItem throws', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    const { result } = renderHook(() => useLocalStorage('pokemonSearch', ''));

    act(() => {
      result.current[1]('pikachu');
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error setting localStorage key "pokemonSearch":',
      expect.any(Error)
    );
    expect(result.current[0]).toBe('');

    consoleErrorSpy.mockRestore();
  });
});
