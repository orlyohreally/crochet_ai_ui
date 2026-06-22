import { pattern as fetchPattern } from "@/lib/pattern";

import PatternDetailView from "@/components/PatternDetailView";
import { Locale } from "@/i18n.config";

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug: patternSlug, lang } = await params;
  const pattern = await fetchPattern({
    slug: patternSlug,
    lang: lang as Locale,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-800">
      <PatternDetailView pattern={pattern} />
    </main>
  );
}
