import { CalendarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

import { Pattern } from "@/lib/interfaces";
import { DEFAULT_PATTERN_IMAGE } from "@/lib/constants";

import PatternLabel from "@/components/PatternLabel";
import PatternAuthor from "@/components/PatternAuthor";
import PatternImage from "./PatternImage";
import { formatDate } from "@/utils/formDate";
import MaterialsList from "./MaterialItem";
import RecommendedYarn from "./RecommendedYarn";
import ImageGallery from "./ImageGallery";

export default function PatternDetailView({ pattern }: { pattern: Pattern }) {
  const patternImage = pattern.imageUrl || DEFAULT_PATTERN_IMAGE;
  const patternMockData = {
    hooks: [
      { size: "2.5", purpose: "Для основного тела и головы игрушки" },
      { size: "2.0", purpose: "Для мелких деталей (ушки, хвостик)" },
    ],
    stuffing: {
      type: "Холлофайбер / Синтепух",
      amount: "~80–100 г",
    },
    notions: [
      {
        id: "eyes",
        name: "Глазки на безопасном креплении",
        amount: "1 пара",
        details: "Размер 12 мм",
      },
      {
        id: "needle",
        name: "Игла с тупым концом",
        amount: "1 шт",
        details: "Для сшивания деталей",
      },
      {
        id: "markers",
        name: "Маркеры для петель",
        amount: "3-5 шт",
        details: "Для разметки рядов",
      },
    ],
  };
  const neededMaterials = [
    {
      brand: "Himalaya Dolphin Baby",
      colors: [
        { number: "80317", hex: "#EAD2AC", name: "Beige" },
        { number: "80301", hex: "#FFFFFF", name: "White" },
        { number: "80311", hex: "#2C2C2C", name: "Black" },
      ],
    },
  ];
  const imageUrls = [
    "https://res.cloudinary.com/doojrsxjl/image/upload/v1779644829/matsusha-2_ejeubf.jpg",
    "https://res.cloudinary.com/doojrsxjl/image/upload/v1778219240/image_zxox31.jpg",
    "https://res.cloudinary.com/doojrsxjl/image/upload/v1779644829/matsusha-2_ejeubf.jpg",
    "https://res.cloudinary.com/doojrsxjl/image/upload/v1778219240/image_zxox31.jpg",
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-5">
        {/* <PatternImage
          patternImageUrl={patternImage}
          patternIsFree={pattern.isFree}
          patternName={pattern.name}
        /> */}
        <ImageGallery images={imageUrls || []} patternName={pattern.name} />
      </div>

      {/* Right Column: Information & Actions */}
      <div className="lg:col-span-7 flex flex-col justify-between min-h-[450px]">
        <div>
          {/* Category & Timestamps Row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 hover:underline">
              {pattern.category.name}
            </span>
            <span className="text-slate-300 text-xs">•</span>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{formatDate(pattern.createdAt)}</span>
              {pattern.updatedAt && pattern.updatedAt !== pattern.createdAt && (
                <span className="text-slate-400 italic font-normal ml-1">
                  (изм. {formatDate(pattern.updatedAt)})
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {pattern.name}
            </h1>

            {/* Highlighted Status Badge */}
            <div className="shrink-0 self-start sm:self-auto">
              {pattern.isFree ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Бесплатно
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                  Платный МК
                </span>
              )}
            </div>
          </div>

          <PatternAuthor author={pattern.author} />

          <div className="flex flex-wrap gap-2 mb-6">
            {pattern.labels.map((label) => (
              <PatternLabel label={label} key={label.slug} />
            ))}
          </div>

          <hr className="border-slate-100 my-6" />

          <div className="mb-6 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-4">
            {/* Header matching RecommendedYarn & MaterialsList blocks precisely */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                О мастер-классе
              </h4>
            </div>

            {/* Content Row utilizing the exact same bg-white canvas properties */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {pattern.description}
              </p>
            </div>
          </div>
        </div>
        <section id="materials" className="space-y-4">
          {neededMaterials && neededMaterials.length > 0 && (
            <RecommendedYarn initialMaterial={neededMaterials[0]} />
          )}

          <MaterialsList
            hooks={patternMockData.hooks}
            stuffing={patternMockData.stuffing}
            notions={patternMockData.notions}
          />
        </section>

        {/* Action Footer */}
      </div>
    </div>
  );
}
