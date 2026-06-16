import { PurchaseSource } from "@/lib/interfaces";
import { defaultBrandStyle, BRAND_MAP } from "./constants";

export function PurchaseSourceLink({ source }: { source: PurchaseSource }) {
  const config = BRAND_MAP[source.marketplace] || defaultBrandStyle;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-100 font-bold text-xs shadow-xs transition-colors ${config.style}`}
    >
      <span>{config.label}</span>
    </a>
  );
}
