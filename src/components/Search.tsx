'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { searchAction } from '@/lib/actions';
import './Search.css';
import Button from './Button';

export default function Search() {
  const [, formAction] = useActionState(searchAction, null);
  const [value, setValue] = useState('');

  return (
    <form action={formAction} className="search">
      <input
        className="search__input"
        type="text"
        name="query"
        value={value}
        onChange={(event) => { setValue(event.target.value); }}
        placeholder="Search pokemon by name"
      />
      <Button label="Search" type="submit" />
    </form>
  );
}