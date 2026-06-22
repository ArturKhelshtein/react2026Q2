'use client';

import './AppHeader.css';
import Navigator from './Navigator';
import LocaleSwitcher from './LocaleSwitcher';
import { useTheme } from '@/providers/ThemeProvider';

export default function AppHeader() {
  const { toggleTheme } = useTheme();

  return (
    <header className="app__header">
      <Navigator />
      <div className="app-header__controls">
        <button onClick={toggleTheme} type="button" className="theme-toggle">
          Toggle Theme
        </button>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
