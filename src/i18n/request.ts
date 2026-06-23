import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import en from '../../messages/en.json';
import ru from '../../messages/ru.json';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const messages = locale === 'ru' ? ru : en;

  return {
    locale,
    messages,
  };
});