"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { NestedDictionary, Pattern } from "@/lib/interfaces";
import PatternListItem from "@/components/Patterns/PatternsListItem";

export default function HomePage() {
  const { dict } = useLang();
  const dictHome = dict.home as NestedDictionary;

  // Mock array simulating your patterns database fetch
  const featuredPatterns: Pattern[] = [
    {
      slug: "amigurumi-yellow-bird",
      name: "Amigurumi Yellow Bird",
      description: "A cute and simple amigurumi yellow bird pattern.",
      imageUrl:
        "https://res.cloudinary.com/doojrsxjl/image/upload/v1778218961/sun_wtacln.jpg",
      category: {
        name: "Amigurumi",
        slug: "amigurumi",
      },
      labels: [
        {
          name: "Beginner",
          slug: "beginner",
        },
      ],
      isFree: true,

      // type: "Crochet",
      level: dictHome.difficultyEasy as string,
      mainHookSize: "3.0mm",
      mainYarnBrand: "YarnArt",
      mainYarnLineName: "Jeans",
    },
    {
      slug: "cookie",
      name: "Cookie",
      description: "A cute and simple amigurumi cookie pattern.",
      imageUrl:
        "https://res.cloudinary.com/doojrsxjl/image/upload/v1778218961/cookie_ti8w7c.jpg",
      category: {
        name: "Food",
        slug: "food",
      },
      labels: [
        {
          name: "Beginner",
          slug: "beginner",
        },
      ],
      isFree: false,
      // type: "Crochet",
      level: dictHome.difficultyEasy as string,
      mainHookSize: "3.0mm",
      mainYarnBrand: "YarnArt",
      mainYarnLineName: "Jeans",
    },
    // {
    //   id: 2,
    //   title: "Minimalist Summer Bolero",
    //   type: "Knitting",
    //   gauge: "Cotton-Merino",
    //   level: dictHome.difficultyMedium,
    //   hook: "4.5mm",
    //   image:
    //     "https://images.unsplash.com/photo-1584992231908-540a48d66b9b?auto=format&fit=crop&q=80&w=600",
    // },
    // {
    //   id: 3,
    //   title: "Classic Chunky Socks",
    //   type: "Knitting",
    //   gauge: "Wool Blend",
    //   level: dictHome.difficultyEasy,
    //   hook: "5.0mm",
    //   image:
    //     "https://images.unsplash.com/photo-1575844265551-2400e96030fc?auto=format&fit=crop&q=80&w=600",
    // },
  ];

  return (
    <div className="w-full space-y-24 py-12 md:py-20">
      {/* 1. HERO SECTION: Asymmetrical Layout */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-5">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 bg-indigo-50 tracking-wide uppercase">
            {dictHome.badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight md:leading-none">
            {dictHome.heroTitle}
          </h1>
        </div>
        <div className="lg:col-span-6 lg:pt-8 space-y-8">
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {dictHome.heroSubtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/generate"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
            >
              {dictHome.ctaCreate}
            </Link>
            <Link
              href="/catalog"
              className="px-5 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm rounded-xl transition-all shadow-sm"
            >
              {dictHome.ctaBrowse}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {dict.home.catalogTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {dict.home.catalogSubtitle}
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 shrink-0"
          >
            {dict.home.viewAll} &rarr;
          </Link>
        </div>

        {/* Visual Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPatterns.map((pattern) => (
            <div
              key={pattern.slug}
              className="group bg-white border border-slate-200/60 hover:border-slate-300 rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col"
            >
              {/* Image Container Wrapper */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={pattern.imageUrl}
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
                      {dict.home.badgeFree}
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide rounded-lg shadow-sm">
                      {dict.home.premiumText}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content details */}
              <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-600">
                    crochet
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {pattern.name}
                  </h4>

                  {/* Dynamically Generated Inline Meta Labels */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {pattern.labels.map((label, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-200/40 text-[10px] font-medium rounded-md"
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span className="font-medium text-slate-600">
                    {pattern.mainYarnLineName}
                  </span>
                  <span className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {pattern.mainHookSize}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {featuredPatterns.map((pattern) => (
            <PatternListItem pattern={pattern} key={pattern.slug}/>
            
          ))}
        </div>
      </section>
      

      {/* 5. FINAL CONVERSION BANNER */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-sm">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {dictHome.footerCtaTitle}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {dictHome.footerCtaDesc}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md"
            >
              {dictHome.footerCtaBtn}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
