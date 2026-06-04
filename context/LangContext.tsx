"use client";
import React, {
  createContext,
  useContext,
  useState,
  useTransition,
} from "react";

import { I18N_CONFIG, Locale } from "@/i18n.config";
import { NestedDictionary } from "@/lib/interfaces";
import { setLanguageCookie } from "@/app/actions";

interface LangContextType {
  dict: NestedDictionary;
  isPending: boolean;
  lang: Locale;
  localeLabels: { [key: string]: string };
  locales: readonly Locale[];
  setLang: (newLang: Locale) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({
  children,
  initialLang,
  initialDict,
}: {
  children: React.ReactNode;
  initialLang: Locale;
  initialDict: NestedDictionary;
}) {
  const [lang, setLangState] = useState<Locale>(initialLang);
  const [isPending, startTransition] = useTransition();

  const setLang = (newLang: Locale) => {
    if (newLang === lang) return;

    startTransition(async () => {
      setLangState(newLang);
      await setLanguageCookie(newLang);

      window.location.reload();
    });
  };

  return (
    <LangContext.Provider
      value={{
        lang,
        dict: initialDict,
        setLang,
        isPending,
        locales: I18N_CONFIG.locales,
        localeLabels: I18N_CONFIG.localeLabels,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within a LangProvider");
  return context;
};
