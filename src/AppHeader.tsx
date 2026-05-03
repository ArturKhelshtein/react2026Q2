import { Component, type ChangeEvent, type FormEvent } from 'react';
import './AppHeader.css';
import Search from './Search';

type AppHeaderProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

class AppHeader extends Component<AppHeaderProps> {
  render() {
    const { value, onChange, onSubmit } = this.props;

    return (
      <header className="app__header">
        <Search value={value} onChange={onChange} onSubmit={onSubmit} />
      </header>
    );
  }
}

export default AppHeader;
