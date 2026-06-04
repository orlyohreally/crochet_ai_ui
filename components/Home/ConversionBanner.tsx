import { TelegramIcon, VKontakteIcon } from "@/components/Icons";

export default function ConversionBanner({
  dict,
}: {
  dict: { [key: string]: string };
}) {
  return (
    <section className="max-w-5xl mx-auto px-6">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-sm">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            {dict.footerCtaTitle}
          </h3>
          <p className="text-xs md:text-sm text-slate-400 font-normal">
            {dict.footerCtaDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://t.me/orlys_toys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#26A5E4] hover:bg-[#2295CC] text-white font-bold text-xs rounded-xl transition-all shadow-sm"
          >
            <TelegramIcon
              className="w-3.5 h-3.5 fill-current"
              aria-hidden="true"
            />
            {dict.btnTelegram}
          </a>

          <a
            href="https://vk.com/orlys_toys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077FF] hover:bg-[#0066DD] text-white font-bold text-xs rounded-xl transition-all shadow-sm"
          >
            <VKontakteIcon
              className="w-3.5 h-3.5 fill-current"
              aria-hidden="true"
            />
            {dict.btnVK}
          </a>
        </div>
      </div>
    </section>
  );
}
