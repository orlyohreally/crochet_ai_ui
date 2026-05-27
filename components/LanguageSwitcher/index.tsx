"use client";
import { ChangeEvent } from "react";

import { Locale } from "@/i18n.config";
import { useLang } from "@/context/LangContext";

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const { isPending, locales, localeLabels, setLang } = useLang();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;
    setLang(newLocale);
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={handleLanguageChange}
        disabled={isPending}
        className={`block w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all cursor-pointer font-medium ${
          isPending
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "cursor-pointer"
        }`}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale] || locale}
          </option>
        ))}
      </select>
    </div>
  );
}
