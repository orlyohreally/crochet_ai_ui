"use client";
import { use } from "react";

import { useLang } from "@/context/LangContext";
import { CondensedPattern } from "@/lib/interfaces";

import ConversionBanner from "./ConversionBanner";
import FeaturedPatterns from "./FeaturedPatterns";
import FeaturesGrid from "./FeaturesGrid";
import HomeHero from "./HomeHero";

export default function Home({
  featuredPatterns,
}: {
  featuredPatterns: Promise<CondensedPattern[]>;
}) {
  const dictHome: { [key: string]: string } = useLang().dict.home as {
    [key: string]: string;
  };
  const patterns = use(featuredPatterns);

  return (
    <div className="w-full space-y-24 py-12 md:py-20">
      <HomeHero dict={dictHome} />

      <FeaturesGrid dict={dictHome} />

      <FeaturedPatterns dict={dictHome} patterns={patterns} />

      <ConversionBanner dict={dictHome} />
    </div>
  );
}
