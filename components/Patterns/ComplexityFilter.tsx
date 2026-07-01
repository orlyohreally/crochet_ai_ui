import { useState, useEffect } from "react";

import { SearchPatternLevel } from "@/lib/interfaces";

export default function LevelsFilter({
  levels,
  selectedLevels,
  setSelectedLevels,
}: {
  levels: SearchPatternLevel[];
  selectedLevels: string[];
  setSelectedLevels: (levelSlug: string[]) => void;
}) {
  const [expandLevels, setExpandLevels] = useState(false);
  const limitLevels = 2;
  const populateLevels = [...levels]
    .sort((levelA, levelB) => -(levelA.patternCount - levelB.patternCount))
    .slice(0, limitLevels);

  const displayedLevels = expandLevels ? levels : populateLevels;

  // const toggleLevel = (level: string) => {
  //   setSelectedLevels((prev) =>
  //     prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
  //   );
  // };

  return (
    <div className="flex items-start gap-4">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2 shrink-0 w-16">
        Levels:
      </span>
      <div
        className="flex-1 flex flex-wrap gap-1.5 overflow-hidden transition-all duration-200"
        style={{ maxHeight: expandLevels ? "500px" : "32px" }}
      >
        {displayedLevels.map((level) => {
          const active = selectedLevels.includes(level.slug);
          return (
            <button
              key={level.slug}
              // onClick={() => toggleLevel(level.slug)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${active ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium" : "bg-zinc-50 border-gray-200 text-gray-600 hover:bg-zinc-100"}`}
            >
              {level.name} ({level.patternCount}) {active && "✓"}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setExpandLevels(!expandLevels)}
        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold shrink-0 mt-1"
      >
        {expandLevels ? "Collapse" : "• See All"}
      </button>
    </div>
  );
}
