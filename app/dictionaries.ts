import "server-only";

import { I18N_CONFIG, Locale } from '../i18n.config';

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
};


export const getDictionary = async (locale: string) => {
  const targetLocale = I18N_CONFIG.locales.includes(locale as Locale)
    ? (locale as Locale)
    : I18N_CONFIG.defaultLocale;

  return dictionaries[targetLocale as Locale]();
};
