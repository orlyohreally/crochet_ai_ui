import { SearchCategory, SearchLabel } from "@/lib/interfaces";

export default function CategoryFilter2({
  labels,
  selectedLabels,
  setSelectedLabels,
}: {
  labels: SearchLabel[];
  selectedLabels: string[]; // Handled based on your logic check below
  setSelectedLabels: (labelSlug: string[]) => void;
}) {
  const sortedLabels = [...labels].sort(
    (catA, catB) => catB.patternCount - catA.patternCount,
  );

  const toggleLabel = (label: string) => {
    setSelectedLabels(
      selectedLabels.includes(label)
        ? selectedLabels.filter((l) => l !== label)
        : [...selectedLabels, label],
    );
  };

  return (
    <div className="flex flex-nowrap items-center gap-4 w-full min-w-0 overflow-hidden">
      {/* 1. Left Title descriptor */}
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0 w-16 select-none">
        Category:
      </span>

      {/* 2. Isolated scroll track */}
      <div
        role="radiogroup"
        aria-label="Filter by category"
        className="flex-1 min-w-0 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1"
      >
        <div className="flex flex-nowrap gap-1.5 w-max">
          {/*           
          <button
            type="button"
            role="radio"
            aria-checked={!selectedLabels}
            onClick={() => toggleLabel()}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer shrink-0 select-none ${
              !selectedLabels
                ? "bg-gray-950 text-white border-gray-950"
                : "bg-zinc-50 text-gray-600 border-gray-200 hover:bg-zinc-100"
            }`}
          >
            All
          </button> */}

          {/* Dynamic Categories Pills List */}
          {sortedLabels.map((label) => {
            const active = selectedLabels.includes(label.slug);
            return (
              <button
                key={label.slug}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => toggleLabel(label.slug)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer shrink-0 select-none ${
                  active
                    ? "bg-gray-950 text-white border-gray-950"
                    : "bg-zinc-50 text-gray-600 border-gray-200 hover:bg-zinc-100"
                }`}
              >
                {label.name} ({label.patternCount})
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
