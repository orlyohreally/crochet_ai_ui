"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";

import Link from "next/link";

import MainMenuLink from "./MainMenuLink";
import MobileMainMenuLink from "./MobileMainMenuLink";
import { NestedDictionary } from "@/lib/interfaces";

export default function MainMenu({ children }: { children: React.ReactNode }) {
  const { dict } = useLang();
  const dictMainMenu = dict.mainMenu as NestedDictionary;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-xs sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg rotate-12" />
            <span className="uppercase font-black text-xl tracking-tighter text-gray-900 italic">
              Knitka.ai
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <MainMenuLink href={`/patterns`}>
              <span className="hidden sm:inline">
                {dictMainMenu.patterns as string}
              </span>
            </MainMenuLink>
            <MainMenuLink href={`/about`}>
              {dictMainMenu.about as string}
            </MainMenuLink>
          </div>

          <div className="flex items-center gap-4">
            <div className="order-1 md:order-0">{children}</div>
            <div className="md:hidden order-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-hidden"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <MobileMainMenuLink href="/patterns">
              {dictMainMenu.patterns as string}
            </MobileMainMenuLink>
            <MobileMainMenuLink href="/about">
              {dictMainMenu.about as string}
            </MobileMainMenuLink>
          </div>
        </div>
      )}
    </nav>
  );
}
