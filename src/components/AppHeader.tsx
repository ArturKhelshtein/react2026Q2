import { type ChangeEvent, type SubmitEvent } from 'react';
import './AppHeader.css';
import Search from './Search';
import Navigator from './Navigator';

interface AppHeaderProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

export default function AppHeader({
  value,
  onChange,
  onSubmit,
}: AppHeaderProps) {
  return (
    <header className="app__header">
      <Navigator />
      <Search value={value} onChange={onChange} onSubmit={onSubmit} />
    </header>
  );
}
