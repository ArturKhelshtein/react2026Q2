import './AppHeader.css';
import Navigator from './Navigator';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeToggle from './ThemeToggle';

export default function AppHeader() {
  return (
    <header className="app__header">
      <Navigator />
      <div className="app-header__controls">
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
