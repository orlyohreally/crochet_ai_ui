"use client";

import Image from "next/image";
import Link from "next/link";

import { Pattern } from "@/lib/interfaces";
import { DEFAULT_PATTERN_IMAGE } from "@/lib/constants";

export default function PatternListItem({ pattern }: { pattern: Pattern }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-gray-100 group">
      <Link href={`/patterns/${pattern.slug}`}>
        <div className="h-64 w-full overflow-hidden relative">
          <Image
            src={pattern.imageUrl || DEFAULT_PATTERN_IMAGE}
            alt={pattern.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
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

        <div className="flex flex-col gap-3">
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
        </div>
      </div>
    </div>
  );
}
