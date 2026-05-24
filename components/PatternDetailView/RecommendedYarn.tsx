"use client";
import React, { useState } from "react";
import { SwatchIcon, SparklesIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
interface YarnColor {
  number: string;
  hex: string;
  name?: string;
}
interface NeededMaterial {
  brand: string;
  colors: YarnColor[];
}
// Data shape for custom palette combinations
interface PresetCombination {
  id: string;
  combinationName: string;
  isAiGenerated?: boolean;
  colors: YarnColor[];
}
export default function RecommendedYarn({ initialMaterial }: { initialMaterial: NeededMaterial }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColors, setActiveColors] = useState<YarnColor[]>(initialMaterial.colors);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("original");
  // State to hold custom dynamically generated options (like from an AI engine)
  const [combinations, setCombinations] = useState<PresetCombination[]>([
    {
      id: "original",
      combinationName: "Классический (Оригинал)",
      colors: initialMaterial.colors
    },
    {
      id: "pastel-mint",
      combinationName: "Нежная мята",
      colors: [
        { number: "80307", hex: "#BFFCC6", name: "Mint" },
        { number: "80301", hex: "#FFFFFF", name: "White" },
        { number: "80350", hex: "#FFC6FF", name: "Soft Pink" }
      ]
    },
    {
      id: "warm-honey",
      combinationName: "Медовый спас",
      colors: [
        { number: "80316", hex: "#E9967A", name: "Dark Beige" },
        { number: "80330", hex: "#FFD700", name: "Honey Mustard" },
        { number: "80302", hex: "#F5F5DC", name: "Cream" }
      ]
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  // Simulated AI generator trigger
  const handleGenerateAiPalette = () => {
    setIsAiLoading(true);
    // In production, hook up fetch(`/api/generate-palette?pattern=${slug}`) here
    setTimeout(() => {
      const aiNewPalette: PresetCombination = {
        id: `ai-${Date.now()}`,
        combinationName: `Нейро-подбор #${Math.floor(Math.random() * 900 + 100)}`,
        isAiGenerated: true,
        colors: [
          { number: "80325", hex: "#C084FC", name: "AI Lavender" },
          { number: "80361", hex: "#FB923C", name: "AI Apricot" },
          { number: "80301", hex: "#FFFFFF", name: "White" }
        ]
      };
      setCombinations((prev) => [...prev, aiNewPalette]);
      setActiveColors(aiNewPalette.colors);
      setSelectedPresetId(aiNewPalette.id);
      setIsAiLoading(false);
    }, 1200);
  };
  const selectPalette = (preset: PresetCombination) => {
    setActiveColors(preset.colors);
    setSelectedPresetId(preset.id);
  };
  return (
    <div className="mb-6 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Рекомендуемая пряжа
        </h4>
        <button 
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors self-start sm:self-auto bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:shadow"
        >
          <SwatchIcon className="w-3.5 h-3.5 text-indigo-500" />
          Подобрать другие цвета
        </button>
      </div>
      {/* Main Row displays whichever color state is active */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <span className="text-sm font-bold text-slate-700 sm:w-1/3">
          {initialMaterial.brand}
        </span>
        <div className="flex flex-wrap gap-3 items-center">
          {activeColors.map((color, colorIdx) => (
            <div 
              key={colorIdx} 
              className="group relative flex items-center justify-center w-15 h-15 rounded-full border border-slate-200 shadow-sm transition-transform hover:scale-105"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              <span className="text-[10px] font-extrabold tracking-tighter px-1 rounded bg-white/90 text-slate-900 shadow-sm border border-slate-200/50">
                {color.number}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Dynamic Overlay Palette Modal Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          {/* Modal Content Window */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto z-10 border border-slate-100 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <SwatchIcon className="w-5 h-5 text-indigo-500" />
                Варианты расцветок
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            {/* AI Generator Action Panel */}
            <button
              onClick={handleGenerateAiPalette}
              disabled={isAiLoading}
              className="relative overflow-hidden w-full mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-xl shadow transition-transform active:scale-[0.99] hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm group"
            >
              {isAiLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4 animate-pulse text-amber-200" />
                  <span>Сгенерировать палитру через AI</span>
                </>
              )}
            </button>
            {/* List Selection Block */}
            <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Готовые сочетания</div>
              {combinations.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => selectPalette(preset)}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                      isSelected 
                        ? "border-indigo-600 bg-indigo-50/50 shadow-sm" 
                        : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        {preset.combinationName}
                        {preset.isAiGenerated && (
                          <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-md font-bold uppercase">
                            AI
                          </span>
                        )}
                      </div>
                      {/* Swatch Mini Previews inside Row */}
                      <div className="flex gap-1.5 items-center">
                        {preset.colors.map((c, idx) => (
                          <div 
                            key={idx} 
                            className="w-5 h-5 rounded-full border border-slate-200/60 shadow-sm"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="bg-indigo-600 rounded-full p-1 text-white shrink-0">
                        <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Accept / Save Action */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
            >
              Применить выбор
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

