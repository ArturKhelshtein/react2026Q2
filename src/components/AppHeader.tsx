import { type ChangeEvent, type SubmitEvent } from 'react';
import './AppHeader.css';
import Search from './Search';

interface AppHeaderProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

function AppHeader({ value, onChange, onSubmit }: AppHeaderProps) {
  return (
    <header className="app__header">
      <Search value={value} onChange={onChange} onSubmit={onSubmit} />
    </header>
  );
}

export default AppHeader;
