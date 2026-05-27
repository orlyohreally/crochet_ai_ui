"use client";

import Link from "next/link";

import { useLang } from "@/context/LangContext";
import { NestedDictionary } from "@/lib/interfaces";

export default function NotFound() {
  const { dict } = useLang();
  const dictNotFound = dict.notFound as NestedDictionary;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Visual Number with subtle styling */}
      <h1 className="text-[12rem] font-black text-gray-100 leading-none select-none absolute -z-10">
        404
      </h1>

      <div className="relative">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          {dictNotFound.pageNotFound as string}
        </h2>

        <p className="text-gray-500 max-w-md mb-10 leading-relaxed text-lg">
          {dictNotFound.pageDoesNotExistErrorMessage as string}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all hover:shadow-xl active:scale-95"
          >
            {dictNotFound.back as string}
          </Link>

          <Link
            href="/patterns"
            className="px-10 py-4 text-gray-600 font-semibold hover:text-pink-500 transition-colors"
          >
            {dictNotFound.viewAllPatterns as string}
          </Link>
        </div>
      </div>
    </div>
  );
}
