"use client";

import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

import { NestedDictionary } from "@/lib/interfaces";

import { useLang } from "@/context/LangContext";

import Link from "@/components/Link";

export default function PrivacyPage() {
  const { dict } = useLang();
  const dictLegal = dict.legal as NestedDictionary;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Link 
        href="/" 
        className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 gap-1.5 mb-8 group"
      >
        <ArrowLongLeftIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        
        {dictLegal.backToHome as string }
      </Link>

      <article className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {dictLegal.privacyTitle as string}
          </h1>
          <p className="text-xs text-slate-400 mt-1">{dictLegal.privacyUpdated as string}</p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-4">
          {dictLegal.privacyIntro as string}
        </p>

        <div className="space-y-4 pt-4">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              {dictLegal.dataSecTitle as string}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {dictLegal.dataSecText as string}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
