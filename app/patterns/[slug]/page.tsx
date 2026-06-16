import { pattern as fetchPattern } from "@/lib/pattern";

import PatternDetailView from "@/components/PatternDetailView";
// import PatternPurchaseSource from "@/components/PatternPurchaseSource";
// import { CalendarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: patternSlug } = await params;
  const pattern = await fetchPattern(patternSlug);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-800">
      <PatternDetailView pattern={pattern} />
      {/* <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <ShoppingBagIcon className="w-4 h-4 text-indigo-500" />
            Купить мастер-класс на платформах:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pattern.purchaseSources.length > 0 ? (
              pattern.purchaseSources.map((source, idx) => (
                <PatternPurchaseSource key={idx} source={source} />
              ))
            ) : (
              <div className="text-sm italic text-slate-400 py-2">
                Ссылки на покупку будут добавлены автором в ближайшее время.
              </div>
            )}
          </div>
        </div>
      </div> */}
    </main>
  );
}
