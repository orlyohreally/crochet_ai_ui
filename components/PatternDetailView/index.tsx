"use client";

import { CalendarIcon } from "@heroicons/react/24/solid";

import { Pattern } from "@/lib/interfaces";
import { DEFAULT_PATTERN_IMAGE } from "@/lib/constants";

import { useLang } from "@/context/LangContext";

import { formatDate } from "@/utils/formDate";

import PatternLabel from "@/components/PatternLabel";
import PatternAuthor from "@/components/PatternAuthor";
import PatternImage from "./PatternImage";
import MaterialsList from "./MaterialsList";
import RecommendedYarn from "./RecommendedYarn";
import PatternPurchaseSource from "./PatternPurchaseSources";

export default function PatternDetailView({ pattern }: { pattern: Pattern }) {
  const { dict: useLangDict, lang } = useLang();
  const dict = useLangDict.patternItem as { [key: string]: string };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-5 col-span-1">
        <PatternImage
          imageUrl={pattern.imageUrl || DEFAULT_PATTERN_IMAGE}
          imageAlt={pattern.name}
        >
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm border border-slate-200/40 text-slate-800 text-[10px] font-bold tracking-wide rounded-lg shadow-sm">
            {pattern.level}
          </span>

          {pattern.isFree ? (
            <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold tracking-wide rounded-lg shadow-sm">
              {dict.badgeFree}
            </span>
          ) : (
            <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide rounded-lg shadow-sm">
              {dict.badgePaid}
            </span>
          )}
        </PatternImage>
      </div>

      <div className="lg:col-span-7 col-span-1 flex flex-col justify-between min-h-112.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
          {pattern.category && (
            <>
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 hover:underline">
                {pattern.category.name}
              </span>
              <span className="text-slate-300 text-xs">•</span>
            </>
          )}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <CalendarIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{formatDate(pattern.createdAt, lang)}</span>
            {pattern.updatedAt && pattern.updatedAt !== pattern.createdAt && (
              <span className="text-slate-400 italic font-normal ml-1">
                ({dict.updatedTimestampTitle}{" "}
                {formatDate(pattern.updatedAt, lang)})
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {pattern.name}
          </h1>
        </div>

        <PatternAuthor author={pattern.author} />

        <div className="flex flex-wrap gap-2">
          {pattern.labels.map((label) => (
            <PatternLabel label={label} key={label.slug} />
          ))}
        </div>

        <hr className="border-slate-100 my-6" />

        <section id="purchase_source" className="mb-6 col-span-1">
          <PatternPurchaseSource
            sources={pattern.purchaseSources}
            dict={dict}
            isFree={pattern.isFree}
          />
        </section>

        {pattern.description && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-3xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {dict.aboutTitle}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line text-justify">
              {pattern.description}
            </p>
          </div>
        )}
      </div>

      {pattern.variants && (
        <section id="yarn" className="space-y-4 col-span-1 lg:col-span-6">
          {pattern.variants && pattern.variants.length > 0 && (
            <RecommendedYarn dict={dict} variants={pattern.variants} />
          )}
        </section>
      )}

      {(pattern.materials || pattern.hooks) && (
        <section id="materials" className="space-y-4 col-span-1 lg:col-span-6">
          <MaterialsList
            dict={dict}
            materials={pattern.materials}
            hooks={pattern.hooks}
          />
        </section>
      )}
    </div>
  );
}
