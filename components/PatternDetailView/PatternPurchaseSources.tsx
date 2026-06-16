import { PurchaseSource } from "@/lib/interfaces";

import { PurchaseSourceLink } from "./PurchaseSourceLink";

interface PatternSourcesProps {
  dict: { [key: string]: string };
  isFree: boolean;
  sources: PurchaseSource[];
}

export default function PatternPurchaseSources({
  dict,
  isFree,
  sources,
}: PatternSourcesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-stretch rounded-xl border border-gray-200 overflow-hidden shadow-xs bg-gray-50/50">
      <div
        className={`flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2 text-center border-b sm:border-b-0 sm:border-r border-gray-200 font-bold text-xs uppercase tracking-wider whitespace-nowrap text-white ${
          isFree ? "bg-emerald-500" : "bg-amber-500"
        }`}
      >
        <span>{isFree ? dict.badgeFree : dict.badgePaid}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 p-2 flex-1 justify-start sm:justify-end bg-white">
        <span className="text-[11px] text-gray-400 font-medium px-2 hidden md:inline">
          {dict.findPatternAt} {": "}
        </span>
        {sources.map((source) => (
          <PurchaseSourceLink key={source.url} source={source} />
        ))}
      </div>
    </div>
  );
}
