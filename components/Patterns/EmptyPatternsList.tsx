"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { useLang } from "@/context/LangContext";
import { NestedDictionary } from "@/lib/interfaces";

export default function EmptyPatternsList() {
  const { dict } = useLang();
  const patternDashboardDict = dict.patternDashboard as NestedDictionary;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <MagnifyingGlassIcon className="size-12" />
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {patternDashboardDict.emptyTitle as string}
          </h4>
          <p className="text-xs text-slate-500">
            {patternDashboardDict.emptyDescription as string}
          </p>
        </div>
      </div>
    </div>
  );
}
