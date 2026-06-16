import { pattern as fetchPattern } from "@/lib/pattern";

import PatternDetailView from "@/components/PatternDetailView";

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
    </main>
  );
}
