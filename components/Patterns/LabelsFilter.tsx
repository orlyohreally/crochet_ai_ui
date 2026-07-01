import { SearchLabel } from "@/lib/interfaces";

export default function LabelsFilter({
  labels,
  selectedLabels,
  setSelectedLabels,
}: {
  labels: SearchLabel[];
  selectedLabels: string[];
  setSelectedLabels: (labelSlug: string[]) => void;
}) {
  
    const toggleLabel = (label: string) => {
    setSelectedLabels(
      selectedLabels.includes(label)
        ? selectedLabels.filter((l) => l !== label)
        : [...selectedLabels, label],
    );
  };

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4 w-full max-w-full overflow-hidden">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0 w-16">
        Labels:
      </span>

      <div className="w-full min-w-0 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
        <div className="flex flex-nowrap gap-1.5 w-max">
          {labels.map((label) => {
            const active = selectedLabels.includes(label.slug);
            return (
              <button
                key={label.slug}
                type="button"
                onClick={() => toggleLabel(label.slug)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer whitespace-nowrap font-normal select-none shrink-0 ${
                  active
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                    : "bg-zinc-50 border-gray-200 text-gray-600 hover:bg-zinc-100"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                    active ? "bg-indigo-600" : "bg-transparent"
                  }`}
                />
                <span>
                  {label.name} ({label.patternCount})
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
