import Image from "next/image";

export default function PatternImage({
  patternName,
  patternImageUrl,
  patternIsFree,
}: {
  patternName: string;
  patternImageUrl: string;
  patternIsFree: boolean;
}) {
  return (
    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm top-6">
      <Image
        src={patternImageUrl}
        alt={patternName}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />

      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm tracking-wide uppercase text-white ${
            patternIsFree
              ? "bg-emerald-500"
              : "bg-indigo-600"
          }`}
        >
          {patternIsFree ? "Бесплатно" : "Платный"}
        </span>
      </div>
    </div>
  );
}
