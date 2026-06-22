import Image from "next/image";

import Link from "@/components/Link";

export default function EmptyFeaturedPatternsSection({
  dict,
}: {
  dict: { [key: string]: string };
}) {
  return (
    <div className="bg-slate-50 border border-slate-200/50 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center min-h-[340px]">
      <div className="p-8 md:p-12 md:col-span-7 space-y-6 text-left">
        <div className="space-y-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700">
            {dict.emptyBadge}
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {dict.emptyTitle}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md">
            {dict.emptyDesc}
          </p>
        </div>

        <div>
          <Link
            href="/#conversion_banner"
            className="inline-flex items-center justify-center px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            {dict.emptyCta}
          </Link>
        </div>
      </div>

      <div className="relative h-64 md:h-full w-full md:col-span-5 bg-slate-100 min-h-60">
        <Image
          src="/ai_generated_bunny.png"
          alt={dict.emptyImageAlt}
          fill
          loading="eager"
          className="object-cover object-center grayscale-15 contrast-105"
          sizes="(max-w-4xl) 40vw, 100vw"
        />
      </div>
    </div>
  );
}
