import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ThrowError from './ThrowError';

describe('ThrowError', () => {
  it('throws an error on mount', () => {
    expect(() => render(<ThrowError />)).toThrow('Test error');
  });
});
