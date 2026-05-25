import { beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadSelectedAsCsv } from './downloadCsv';
import type { AppItem } from '../types';

const item1: AppItem = { id: 1, name: 'Pikachu', description: 'Electric type' };

describe('downloadSelectedAsCsv', () => {
  let createElementSpy: unknown;
  let clickSpy: unknown;

  beforeEach(() => {
    vi.clearAllMocks();

    clickSpy = vi.fn();

    const mockLink = {
      href: '',
      download: '',
      style: { visibility: '' },
      click: clickSpy,
    };

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {
        //
    });

    createElementSpy = vi
    .spyOn(document, 'createElement')
    .mockReturnValue(mockLink as unknown as HTMLElement);

    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
  });

  it('does nothing when items array is empty', () => {
    downloadSelectedAsCsv([]);
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('creates a link and calls click', () => {
    downloadSelectedAsCsv([item1]);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });
});