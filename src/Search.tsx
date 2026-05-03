import { Component, type ChangeEvent, type FormEvent } from 'react';
import './Search.css';
import Button from './Button';

type SearchProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

class Search extends Component<SearchProps> {
  render() {
    const { value, onChange, onSubmit } = this.props;

    return (
      <form className="search" onSubmit={onSubmit}>
        <input
          className="search__input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search pokemon by name"
        />
        <Button label="Search" type="submit" />
      </form>
    );
  }
}

export default Search;
