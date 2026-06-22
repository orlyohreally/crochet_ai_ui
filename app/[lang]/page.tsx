import { featuredPatterns as getFeaturedPatters } from "@/lib/featured";

import Home from "@/components/Home";
import { Locale } from "@/i18n.config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const featuredPatterns = getFeaturedPatters({ lang });
  return <Home featuredPatterns={featuredPatterns} />;
}
