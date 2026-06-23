'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import './LocaleSwitcher.css';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(pathname, { locale: newLocale });
  };

  return (
    <select title="locale" className="locale-switcher" value={locale} onChange={handleChange}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  );
}
