"use client";

import Image from "next/image";
import Link from "next/link";

import { CondensedPattern } from "@/lib/interfaces";

export default function PatternListItem({
  dict,
  pattern,
}: {
  dict: { [key: string]: string };
  pattern: CondensedPattern;
}) {
  const DEFAULT_IMAGE =
    "https://res.cloudinary.com/doojrsxjl/image/upload/v1779574348/copy_of_gemini_generated_image_nlg962nlg962nlg9_uqtcyx.png";

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-gray-100 group">
      <Link href={`/patterns/${pattern.slug}`}>
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
          <Image
            src={pattern.imageUrl || DEFAULT_IMAGE}
            alt={pattern.name}
            fill
            sizes="(max-w-7xl) 33vw, (max-w-md) 100vw"
            className="object-cover group-hover:scale-102 transition-transform duration-300 ease-out"
          />
          {/* Overlaid Badges Row */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm border border-slate-200/40 text-slate-800 text-[10px] font-bold tracking-wide rounded-lg shadow-sm">
              {pattern.level}
            </span>

            {/* Conditional Pricing Badge flag */}
            {pattern.isFree ? (
              <span className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold tracking-wide rounded-lg shadow-sm">
                {dict.badgeFree}
              </span>
            ) : (
              <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide rounded-lg shadow-sm">
                {dict.badgePaid}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-5 space-y-2">
        <h3 className="font-bold text-gray-900 text-lg">{pattern.name}</h3>

        <div className="flex flex-wrap gap-2">
          {pattern.labels.slice(0, 3).map((label) => (
            <span
              key={label.slug}
              className="px-2.5 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase rounded-lg border border-gray-100 flex items-center gap-1"
            >
              {label.name}
            </span>
          ))}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {pattern.description}
        </p>

        <div
          className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3"
          title={dict.mainMaterialsTitle}
        >
          <span className="font-medium text-slate-600">
            {pattern.mainYarnBrand} {pattern.mainYarnLineName}
          </span>
          <span
            className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-100"
            title={dict.mainHookSizeTitle}
          >
            {pattern.mainHookSize}mm
          </span>
        </div>

        {/* <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 px-1">
            {pattern.isFree && (
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Free Pattern
              </span>
            )}
            <Link
              href={`/patterns/${pattern.slug}`}
              className="text-gray-400 font-bold text-xs hover:text-pink-500 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
