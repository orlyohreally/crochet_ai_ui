"use client";
import React, {
  createContext,
  useContext,
  useState,
  useTransition,
} from "react";
import { useRouter, usePathname } from "next/navigation";

import { I18N_CONFIG, Locale } from "@/i18n.config";
import { NestedDictionary } from "@/lib/interfaces";

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

  const router = useRouter();
  const pathname = usePathname();

  const setLang = (newLang: Locale) => {
    if (newLang === lang) return;

    // 1. Calculate the new URL path by replacing the locale prefix
    const segments = pathname.split("/");
    segments[1] = newLang; // Replaces 'en' with 'ru' or vice-versa
    const newPathname = segments.join("/");

    // 2. Wrap state update and routing in a transition to keep UI responsive
    startTransition(() => {
      setLangState(newLang);
      router.push(newPathname);
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
