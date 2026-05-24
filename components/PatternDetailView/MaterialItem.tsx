import React from "react";
import { WrenchScrewdriverIcon, FaceSmileIcon } from "@heroicons/react/24/solid";

interface MaterialItem {
  name: string;
  amount?: string;
  details?: string;
}

interface MaterialsProps {
  hooks: { size: string; purpose?: string }[];
  stuffing: { type: string; amount?: string };
  notions?: MaterialItem[];
}

export default function MaterialsList({ hooks, stuffing, notions = [] }: MaterialsProps) {
  return (
    <div className="mb-6 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-4">
      
      {/* Header matching RecommendedYarn block */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Инструменты и фурнитура
        </h4>
      </div>

      {/* Row 1: Crochet Hooks (Styled exactly like RecommendedYarn row) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <span className="text-sm font-bold text-slate-700 sm:w-1/3 flex items-center gap-2">
          <WrenchScrewdriverIcon className="w-4 h-4 text-slate-400" />
          Размеры крючков
        </span>
        
        <div className="flex flex-wrap gap-3 items-center">
          {hooks.map((hook, idx) => (
            <div 
              key={idx} 
              className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-slate-50 shadow-sm"
              title={hook.purpose}
            >
              <span className="text-[11px] font-extrabold tracking-tight px-1 text-slate-900">
                {hook.size}
              </span>
            </div>
          ))}
          
          {/* Inline subtle reminder for purpose if needed */}
          <span className="text-xs text-slate-400 hidden lg:inline italic ml-2">
            {hooks.map(h => `${h.size}мм`).join(' и ')} для разных деталей
          </span>
        </div>
      </div>

      {/* Row 2: Filling & Notions (Styled exactly like the Marketplace links layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Stuffing Card */}
        <div className="flex items-center justify-between bg-white py-3 px-4 rounded-xl border border-slate-100 shadow-sm text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="font-semibold text-slate-800">{stuffing.type}</span>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            {stuffing.amount}
          </span>
        </div>

        {/* Notions Mapping */}
        {notions.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between bg-white py-3 px-4 rounded-xl border border-slate-100 shadow-sm text-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 leading-tight">{item.name}</span>
                {item.details && (
                  <span className="text-[11px] text-slate-400 font-normal mt-0.5">{item.details}</span>
                )}
              </div>
            </div>
            {item.amount && (
              <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 shrink-0">
                {item.amount}
              </span>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}
