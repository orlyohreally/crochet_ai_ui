import { useState, useRef, useEffect } from "react";
import { SearchPatternLevel } from "@/lib/interfaces";

export default function PatternLevelFilter({
  patternLevels,
  selectedPatternLevels,
  setSelectedPatternLevels,
}: {
  patternLevels: SearchPatternLevel[];
  selectedPatternLevels: string[];
  setSelectedPatternLevels: (patternLevelSlug: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePatternLevel = (patternLevel: string) => {
    setSelectedPatternLevels(
      selectedPatternLevels.includes(patternLevel)
        ? selectedPatternLevels.filter((l) => l !== patternLevel)
        : [...selectedPatternLevels, patternLevel],
    );
  };

  // Close the dropdown if the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine what text to display on the closed dropdown button face
  const getButtonLabel = () => {
    if (selectedPatternLevels.length === 0) return "All Levels";
    if (selectedPatternLevels.length === patternLevels.length) return "All Levels Selected";
    
    // Find the names of selected items
    const selectedNames = patternLevels
      .filter((level) => selectedPatternLevels.includes(level.slug))
      .map((level) => level.name);
      
    if (selectedNames.length <= 3) return selectedNames.join(", ");
    return `${selectedNames.length} Levels selected`;
  };

  return (
    <div className="flex items-center gap-4" ref={dropdownRef}>
      {/* Fixed Filter Header Title */}
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0 w-16">
        Levels:
      </span>

      {/* Dropdown Container Frame */}
      <div className="relative flex-1 sm:flex-initial">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between gap-3 min-w-[160px] px-3 py-1.5 text-xs text-left rounded-lg border bg-white cursor-pointer select-none transition-all ${
            selectedPatternLevels.length > 0
              ? "border-indigo-200 text-indigo-700 bg-indigo-50/30"
              : "border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <span className={selectedPatternLevels.length > 0 ? "font-medium" : "font-normal"}>
            {getButtonLabel()}
          </span>
          {/* Subtle clean arrow icon indicator */}
          <span className={`text-[10px] transition-transform text-gray-400 ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {/* Absolute Floating Dropdown Panel */}
        {isOpen && (
          <div className="absolute left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
            {patternLevels.map((patternLevel) => {
              const active = selectedPatternLevels.includes(patternLevel.slug);
              return (
                <button
                  key={patternLevel.slug}
                  type="button"
                  onClick={() => togglePatternLevel(patternLevel.slug)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {/* Modern flat custom inner multi-checkbox indicator */}
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                        active
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {active && <span className="text-[9px] font-bold">✓</span>}
                    </div>
                    <span className={active ? "font-medium text-gray-900" : "text-gray-600"}>
                      {patternLevel.name}
                    </span>
                  </div>
                  
                  {/* Total match item counter aligned neatly down the right track */}
                  <span className="text-[10px] text-gray-400">
                    {patternLevel.patternCount}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
