export default function FeaturesGrid({
  dict,
}: {
  dict: { [key: string]: string };
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 space-y-12">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200/80 pb-3">
        {dict.featuresTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Feature 1: Multi-Dimensional Search */}
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            {dict.feat1Title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {dict.feat1Desc}
          </p>
        </div>

        {/* Feature 2: Yarn & Gauge Matching */}
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            {dict.feat2Title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {dict.feat2Desc}
          </p>
        </div>

        {/* Feature 3: Version Control */}
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            {dict.feat3Title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {dict.feat3Desc}
          </p>
        </div>
      </div>
    </section>
  );
}
