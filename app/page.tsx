import { featuredPatterns as getFeaturedPatters } from "@/lib/featured";

import Home from "@/components/Home";

export default function HomePage() {
  const featuredPatterns = getFeaturedPatters();
  return <Home featuredPatterns={featuredPatterns} />;
}
