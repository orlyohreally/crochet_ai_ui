"use client";

import { useLang } from "@/context/LangContext";
import { Pattern } from "@/lib/interfaces";

import PatternListItem from "./PatternsListItem";

export default function PatternsList({ patterns }: { patterns: Pattern[] }) {
  const { dict } = useLang();
  const dictPatternItem = dict.patternItem as { [key: string]: string };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {patterns.map((pattern) => (
          <PatternListItem
            dict={dictPatternItem}
            key={pattern.slug}
            pattern={pattern}
          />
        ))}
      </div>
    </div>
  );
}
