import { Component } from 'react';
import './AppHeader.css';
import Search from './Search';

type AppHeaderProps = Record<string, never>;

class AppHeader extends Component<AppHeaderProps> {
  render() {
    return (
      <header className="app__header">
        <Search />
      </header>
    );
  }
}

export default AppHeader;
