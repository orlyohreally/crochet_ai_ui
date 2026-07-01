import { SearchCategory } from "@/lib/interfaces";

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: SearchCategory[];
  selectedCategory?: string | null; // Handled based on your logic check below
  setSelectedCategory: (categorySlug?: string) => void;
}) {
  const sortedCategories = [...categories].sort(
    (catA, catB) => catB.patternCount - catA.patternCount
  );

  return (
    /* FORCED ROW CONTAINER: 
      Maintains identical structure to LabelsFilter to keep the vertical alignment balanced.
    */
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
          {/* 'All' Selection Pill */}
          <button
            type="button"
            role="radio"
            aria-checked={!selectedCategory}
            onClick={() => setSelectedCategory()}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer shrink-0 select-none ${
              !selectedCategory
                ? "bg-gray-950 text-white border-gray-950"
                : "bg-zinc-50 text-gray-600 border-gray-200 hover:bg-zinc-100"
            }`}
          >
            All
          </button>

          {/* Dynamic Categories Pills List */}
          {sortedCategories.map((cat) => {
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer shrink-0 select-none ${
                  active
                    ? "bg-gray-950 text-white border-gray-950"
                    : "bg-zinc-50 text-gray-600 border-gray-200 hover:bg-zinc-100"
                }`}
              >
                {cat.name} ({cat.patternCount})
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
