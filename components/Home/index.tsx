"use client";
import { use } from "react";

import { useLang } from "@/context/LangContext";
import { CondensedPattern } from "@/lib/interfaces";

import ConversionBanner from "./ConversionBanner";
import FeaturedPatternsSection from "./FeaturedPatternsSection";
import FeaturesGrid from "./FeaturesGrid";
import HomeHero from "./HomeHero";

export default function Home({
  featuredPatterns,
}: {
  featuredPatterns: Promise<{ results: CondensedPattern[] }>;
}) {
  const dict = useLang().dict;
  const dictHome: { [key: string]: string } = dict.home as {
    [key: string]: string;
  };
  const dictFeaturedPatterns = dict.featuredPatterns as {
    [key: string]: string;
  };
  const patterns = use(featuredPatterns).results;

  return (
    <div className="w-full space-y-24 py-12 md:py-20">
      <HomeHero dict={dictHome} />

      <FeaturesGrid dict={dictHome} />

      <FeaturedPatternsSection
        dict={dictFeaturedPatterns}
        patterns={patterns}
      />

      <ConversionBanner dict={dictHome} />
    </div>
  );
}
