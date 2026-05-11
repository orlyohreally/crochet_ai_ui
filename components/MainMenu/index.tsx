"use client";

import { useState } from 'react';

import Link from 'next/link'

import MainMenuLink from "./MainMenuLink";
import MobileMainMenuLink from "./MobileMainMenuLink";


export default function MainMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-xs sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg rotate-12" />
            <span className="uppercase font-black text-xl tracking-tighter text-gray-900 italic">
              smart crochet.
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <MainMenuLink href={`/patterns`}>
              <span className="hidden sm:inline">Patterns</span>
            </MainMenuLink>
            <MainMenuLink href={`/color-palette`}>Color Palette</MainMenuLink>
            <MainMenuLink href={`/about`}>About</MainMenuLink>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
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

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <MobileMainMenuLink href="/color-palette">
              Color Palette
            </MobileMainMenuLink>
            <MobileMainMenuLink href="/about">About</MobileMainMenuLink>
          </div>
        </div>
      )}
    </nav>
  );
}
