import Image from "next/image";

export default function PatternImage({
  children,
  imageAlt,
  imageUrl,
}: {
  children?: React.ReactNode;
  imageAlt: string;
  imageUrl: string;
}) {
  return (
    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm top-6">
      <Image
        src={imageUrl }
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        {children}
      </div>
    </div>
  );
}
