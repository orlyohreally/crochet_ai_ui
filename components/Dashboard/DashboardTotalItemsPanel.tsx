"use client";

import { useLang } from "@/context/LangContext";
import { NestedDictionary } from "@/lib/interfaces";

export default function DashboardTotalItemsPanel({
  children,
  handlePageSizeChange,
  totalItems,
  pageSize,
}: {
  children: React.ReactNode;
  handlePageSizeChange: (newPageSize: number) => void;
  pageSize: number;
  totalItems: number;
}) {
  const { dict } = useLang();
  const dictPatternDashboard = dict.patternDashboard as NestedDictionary

  function onPageSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSize = parseInt(event.target.value, 10);
    handlePageSizeChange(newSize);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-4 border-b border-gray-100">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {children}
          <span className="text-gray-400 font-medium ml-1">({totalItems})</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <label
          htmlFor="pageSize"
          className="text-xs font-bold uppercase tracking-widest text-gray-400"
        >
          {dictPatternDashboard.itemsPerPage as string}:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={onPageSizeChange}
          className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all cursor-pointer font-medium"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
}
