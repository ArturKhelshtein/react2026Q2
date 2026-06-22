import { useContext } from 'react';
import { ThemeContext } from '@/providers/ThemeProvider';

export function useTheme() {
  const ctx = useContext(ThemeContext);

  return ctx;
}