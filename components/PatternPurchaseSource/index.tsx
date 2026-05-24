import { PurchaseSources } from "@/lib/interfaces";


import {
  CalendarIcon,
  ShoppingBagIcon,
  LinkIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export default function PatternPurchaseSource({
  source,
}: {
  source: PurchaseSources;
}) {
  // Helper to format the marketplace name nicely for human readers
  function formatMarketplaceName(sourceName: string): string {
    const names: Record<string, string> = {
      VKONTAKTE: "ВКонтакте",
      TELEGRAM: "Telegram",
      BOOSTY: "Boosty",
      ETSY: "Etsy",
      RAVELRY: "Ravelry",
    };
    return names[sourceName.toUpperCase()] || sourceName;
  }

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors text-sm group"
    >
      <span>{formatMarketplaceName(source.marketplace)}</span>
      <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
    </a>
  );
}
