import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TestError from './TestError';

describe('TestError', () => {
  it('renders Test Error button', () => {
    render(<TestError onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: /test error/i })).toBeInTheDocument();
  });
});
