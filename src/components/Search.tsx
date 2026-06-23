'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { searchAction } from '@/lib/actions';
import './Search.css';
import Button from './Button';

export default function Search() {
  const [, formAction] = useActionState(searchAction, null);
  const [value, setValue] = useState('');
  const t = useTranslations('Search');

  return (
    <form action={formAction} className="search">
      <input
        className="search__input"
        type="text"
        name="query"
        value={value}
        onChange={(event) => { setValue(event.target.value); }}
        placeholder={t('placeholder')}
      />
      <Button label={t('searchButton')} type="submit" />
    </form>
  );
}