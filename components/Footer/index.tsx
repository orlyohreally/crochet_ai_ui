"use client";

import { NestedDictionary } from "@/lib/interfaces";

import { useLang } from "@/context/LangContext";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "@/components/Link";

export default function Footer() {
  const { dict } = useLang();

  const dictFooter = dict.footer as NestedDictionary;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-white border-t border-slate-200/80 mt-auto"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Knitka.ai {dictFooter.rights as string}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <nav
            className="flex items-center gap-4 text-xs font-medium text-slate-600"
            aria-label="Footer navigation"
          >
            <Link
              href="/privacy"
              className="hover:text-indigo-600 transition-colors"
            >
              {dictFooter.privacy as string}
            </Link>
            <span className="text-slate-200 hidden sm:inline">|</span>
            <Link
              href="/terms"
              className="hover:text-indigo-600 transition-colors"
            >
              {dictFooter.terms as string}
            </Link>
          </nav>

          <div className="shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
