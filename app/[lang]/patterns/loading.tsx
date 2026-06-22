export default function LoadingPatternsList() {
  const skeletonCards = Array.from({ length: 9 });

  return (
    <section className="p-8 space-y-6">
      {/* Skeleton Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4 animate-pulse">
        <div className="space-y-2">
          {/* Main Section Title Placeholder */}
          <div className="h-6 w-48 bg-slate-200 rounded-lg" />
          {/* Subtitle Placeholder */}
          <div className="h-3 w-64 bg-slate-100 rounded-md" />
        </div>
        {/* 'View All' Right-aligned link placeholder */}
        <div className="h-4 w-24 bg-slate-200 rounded-md shrink-0 self-start sm:self-auto" />
      </div>

      {/* Skeleton Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {skeletonCards.map((_, idx) => (
          <div 
            key={idx} 
            className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col animate-pulse"
          >
            {/* Top Aspect-Ratio Image Box Placeholder */}
            <div className="relative aspect-4/3 w-full bg-slate-200 flex items-center justify-center">
              {/* Optional: Centered icon placeholder to indicate graphic content loading */}
              <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              
              {/* Badges Layout Placeholders overlay */}
              <div className="absolute top-3 left-3 right-3 flex justify-between">
                <div className="h-5 w-12 bg-white/80 rounded-lg" />
                <div className="h-5 w-16 bg-white/80 rounded-lg" />
              </div>
            </div>

            {/* Bottom Meta Content Block Placeholders */}
            <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-2.5">
                {/* Type upper category text placeholder */}
                <div className="h-3 w-16 bg-slate-200 rounded-md" />
                
                {/* Main Heading Text Title placeholder line */}
                <div className="h-5 w-5/6 bg-slate-200 rounded-lg" />
                
                {/* Dynamic Inline Mini Tag Labels placeholders */}
                <div className="flex gap-1.5 pt-1">
                  <div className="h-4 w-16 bg-slate-100 rounded-md" />
                  <div className="h-4 w-12 bg-slate-100 rounded-md" />
                </div>
              </div>

              {/* Card Footer row parameters divider placeholder */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
                <div className="h-3 w-20 bg-slate-100 rounded-md" />
                <div className="h-5 w-12 bg-slate-100 rounded-md" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
