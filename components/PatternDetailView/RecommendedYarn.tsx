import { useState } from "react";
import Image from "next/image"; // Ensure Next.js Image is imported for performance

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

  if (!variants || variants.length === 0) return null;

  const currentVariant = variants[activeVariantIdx];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-4xl w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {dict.variantsSectionTitle}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {dict.variantsSectionDescription}
          </p>
        </div>

        {variants.length > 1 && (
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
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          {currentVariant.imageUrl && (
            <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              <Image
                src={currentVariant.imageUrl}
                alt={`${currentVariant.name} preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 350px"
                className="object-cover transition-all duration-300 hover:scale-105"
              />
            </div>
          )}

          {currentVariant.sizeSm && (
            <div className="flex items-center justify-between bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {dict.finishedSizeLabel}
                </span>
                <span className="text-sm font-semibold text-blue-900 mt-0.5">
                  {currentVariant.sizeSm} {dict.centimeterUnit}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-3 flex flex-col justify-start space-y-4">
          {currentVariant.description && (
            <p className="text-sm text-gray-600 italic bg-gray-50 p-4 rounded-xl border border-gray-100/50">
              {currentVariant.description}
            </p>
          )}

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
              {dict.requiredColorsLabel}
            </h4>
            {currentVariant.yarnColors.map((color) => (
              <ColorCard color={color} dict={dict} key={color.hexCode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
