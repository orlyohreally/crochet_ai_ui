import { Suspense } from "react";

import Link from "next/link";

import { CondensedPattern } from "@/lib/interfaces";

import PatternListItem from "@/components/Patterns/PatternsListItem";
import LoadingHomeSection from "./loading";

export default function FeaturedPatterns({
  dict,
  patterns,
}: {
  dict: { [key: string]: string };
  patterns: CondensedPattern[];
}) {
  return (
    <Suspense fallback={<LoadingHomeSection />}>
      <section className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {dict.catalogTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {dict.catalogSubtitle}
            </p>
          </div>
          <Link
            href="/patterns"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 shrink-0"
          >
            {dict.viewAll} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((pattern) => (
            <PatternListItem dict={dict} pattern={pattern} key={pattern.slug} />
          ))}
        </div>
      </section>
    </Suspense>
  );
}
