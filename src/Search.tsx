import { Component } from 'react';
import './Search.css';
import Button from './Button';

type SearchProps = Record<string, never>;

class Search extends Component<SearchProps> {
  render() {
    return (
      <form className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search pokemon by name"
        />
        <Button />
      </form>
    );
  }
}

export default Search;
