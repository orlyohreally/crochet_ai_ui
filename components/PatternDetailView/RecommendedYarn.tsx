import { useState } from "react";

import { PatternVariant } from "@/lib/interfaces";

import { SelectVariantTab } from "./SelectVariantTab";
import { ColorCard } from "./ColorCard";

interface RecommendedYarnProps {
  variants: PatternVariant[];
  dict: { [key: string]: string };
}

export default function RecommendedYarn({
  variants,
  dict,
}: RecommendedYarnProps) {
  const primaryVariantIndex = variants.findIndex((v) => v.isPrimary);
  const [activeVariantIdx, setActiveVariantIdx] = useState(
    primaryVariantIndex !== -1 ? primaryVariantIndex : 0,
  );

  const currentVariant = variants[activeVariantIdx];

  if (!variants || variants.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {dict.variantsSectionTitle}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {dict.variantsSectionDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex p-1 bg-gray-50 rounded-lg">
            {variants.map((variant, idx) => (
              <SelectVariantTab
                key={variant.number}
                onSelect={() => setActiveVariantIdx(idx)}
                variantName={variant.name}
                isActive={activeVariantIdx === idx}
              />
            ))}
          </div>
        </div>
      </div>

      {currentVariant.description && (
        <p className="text-sm text-gray-600 italic mb-4 bg-gray-50 p-3 rounded-lg">
          {currentVariant.description}
        </p>
      )}

      <div className="space-y-4">
        {currentVariant.yarnColors.map((color) => (
          <ColorCard color={color} dict={dict} key={color.hexCode} />
        ))}
      </div>
    </div>
  );
}
