import { type ChangeEvent, type SubmitEvent } from 'react';
import './Search.css';
import Button from './Button';

interface SearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

function Search({ value, onChange, onSubmit }: SearchProps) {
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

export default Search;
