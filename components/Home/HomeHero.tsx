import Link from "@/components/Link";

export default function HomeHero({
  dict,
}: {
  dict: { [key: string]: string };
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 space-y-5">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 bg-indigo-50 tracking-wide uppercase">
          {dict.badge}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight md:leading-none">
          {dict.heroTitle}
        </h1>
      </div>
      <div className="lg:col-span-6 lg:pt-8 space-y-8">
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          {dict.heroSubtitle}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/patterns"
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
          >
            {dict.ctaBrowse}
          </Link>
        </div>
      </div>
    </section>
  );
}
