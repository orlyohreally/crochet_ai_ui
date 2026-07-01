"use client";

import React, { useState, useEffect } from "react";
import { CondensedPattern, SearchCategory } from "@/lib/interfaces";

import PatternListItem from "./PatternsListItem";
import { useLang } from "@/context/LangContext";

const LABELS = ["Cozy", "Lace", "Cables", "Wool", "Vintage", "Boho", "Seamless", "Oversized", "Nordic", "Brioche", "Ribbed", "Chunky", " Tunisian", "Fair Isle"];
const COMPLEXITIES = ["Beginner", "Easy", "Intermediate", "Advanced"];
const BRANDS = ["Malabrigo", "Cascade Yarns", "MadelineTosh"];
const BRAND_LINES = ["Jeans", "Dolce", "Merino Worsted", "Heritage"];
const YARN_WEIGHTS = ["Lace", "Sport", "DK", "Worsted", "Chunky"];
const PATTERN_FORMATS = ["Video", "PDF", "Text"];
const PURCHASE_SOURCES = ["Etsy", "Ravelry", "VK", "Knitka Shop"];

const COLORS = [
  { name: "Mustard Yellow", slug: "mustard-yellow", hex: "bg-amber-500" },
  { name: "Crimson Red", slug: "crimson-red", hex: "bg-red-600" },
  { name: "Teal Blue", slug: "teal-blue", hex: "bg-teal-600" },
  { name: "Emerald Green", slug: "emerald-green", hex: "bg-emerald-700" },
  { name: "Plum Purple", slug: "plum-purple", hex: "bg-purple-800" },
];

export default function PatternsList({
  patterns,
  categories,
}: {
  categories: SearchCategory[];
  patterns: CondensedPattern[];
}) {
  const { dict } = useLang();
  const dictPatternItem = dict.patternItem as { [key: string]: string };

  // --- FILTER STATES ---
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<string | null>(null);
  const [priceType, setPriceType] = useState<"all" | "free" | "premium">("all");

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedBrandLine, setSelectedBrandLine] = useState<string | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [hookSize, setHookSize] = useState("");
  const [productSize, setProductSize] = useState("");

  const [sortBy, setSortBy] = useState("-created_at");

  // UI Expandable Toggles
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [expandCategories, setExpandCategories] = useState(false);
  const [expandLabels, setExpandLabels] = useState(false);

  // Pagination Meta
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(48);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const startItemIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItemIndex = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const toggleLabel = (label: string) => {
    setCurrentPage(1);
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedLabels([]);
    setSelectedComplexity(null);
    setPriceType("all");
    setSelectedBrand(null);
    setSelectedBrandLine(null);
    setSelectedWeight(null);
    setSelectedColor(null);
    setSelectedFormat(null);
    setSelectedSource(null);
    setHookSize("");
    setProductSize("");
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen text-gray-900 antialiased font-sans bg-zinc-50/40">
      
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
        
        {/* ROW 1: Inline Title + Search Bar */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-1 items-center gap-6 max-w-2xl">
            <h1 className="text-xl font-light tracking-wide text-gray-950 shrink-0">Discover</h1>
            <div className="relative flex-1">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type keywords, yarn, or designer..."
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-zinc-50 transition-all text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600 focus:outline-none"
            >
              <option value={12}>12 items</option>
              <option value={24}>24 items</option>
              <option value={48}>48 items</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600 focus:outline-none"
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* ROW 2: Condensed Filters Panel with smart overflowing lists */}
        <div className="max-w-7xl mx-auto px-6 pb-4 pt-2 border-t border-gray-100 space-y-4">
          
          {/* Categories Grid/Row */}
          <div className="flex items-start gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2 shrink-0 w-16">Category:</span>
            <div className="flex-1 flex flex-wrap gap-1.5 overflow-hidden transition-all duration-200" style={{ maxHeight: expandCategories ? '500px' : '32px' }}>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${selectedCategory === null ? "bg-gray-950 text-white border-gray-950" : "bg-zinc-50 text-gray-600 border-gray-200 hover:bg-zinc-100"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${selectedCategory === cat.slug ? "bg-gray-950 text-white border-gray-950" : "bg-zinc-50 text-gray-600 border-gray-200 hover:bg-zinc-100"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setExpandCategories(!expandCategories)} 
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold shrink-0 mt-1"
            >
              {expandCategories ? "Collapse" : "• See All"}
            </button>
          </div>

          {/* Labels Grid/Row */}
          <div className="flex items-start gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2 shrink-0 w-16">Labels:</span>
            <div className="flex-1 flex flex-wrap gap-1.5 overflow-hidden transition-all duration-200" style={{ maxHeight: expandLabels ? '500px' : '32px' }}>
              {LABELS.map((label) => {
                const active = selectedLabels.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => toggleLabel(label)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${active ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium" : "bg-zinc-50 border-gray-200 text-gray-600 hover:bg-zinc-100"}`}
                  >
                    {label} {active && "✓"}
                  </button>
                );
              })}
            </div>
            <button 
              onClick={() => setExpandLabels(!expandLabels)} 
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold shrink-0 mt-1"
            >
              {expandLabels ? "Collapse" : "• See All"}
            </button>
          </div>

          {/* Global Meta Line: Complexity, Access & Advanced Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-y-3 pt-2 border-t border-zinc-100">
            <div className="flex flex-wrap items-center gap-6">
              {/* Complexity */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Complexity:</span>
                <select
                  value={selectedComplexity || ""}
                  onChange={(e) => { setSelectedComplexity(e.target.value || null); setCurrentPage(1); }}
                  className="bg-zinc-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-600 focus:outline-none"
                >
                  <option value="">All Levels</option>
                  {COMPLEXITIES.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Access Type (Free/Premium) */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Access:</span>
                <div className="bg-zinc-100 p-0.5 rounded-lg flex border border-gray-200">
                  {(["all", "free", "premium"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => { setPriceType(type); setCurrentPage(1); }}
                      className={`px-2 py-0.5 text-[11px] rounded-md font-medium capitalize transition-all ${priceType === type ? "bg-white text-gray-950 shadow-xs" : "text-gray-500 hover:text-gray-900"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Trigger Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-gray-950 transition-colors border border-gray-200 rounded-lg px-2.5 py-1"
              >
                {isAdvancedOpen ? "Less Options" : "More Options"}
              </button>
              {(selectedCategory || selectedLabels.length > 0 || selectedComplexity || priceType !== "all" || selectedBrand || selectedBrandLine || selectedWeight || selectedColor || selectedFormat || selectedSource || hookSize || productSize || search) && (
                <button onClick={clearAllFilters} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Reset
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ROW 3: Collapsible Extended Filters Block */}
        <div 
          className={`border-t border-gray-100 bg-zinc-50/50 overflow-hidden transition-all duration-300 ease-in-out ${
            isAdvancedOpen ? "max-h-[500px] opacity-100 py-5" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5 text-sm">
            
            {/* Yarn Identity Group */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Yarn Base</h4>
              <div className="space-y-2">
                <select
                  value={selectedBrand || ""}
                  onChange={(e) => setSelectedBrand(e.target.value || null)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-600"
                >
                  <option value="">Any Yarn Brand</option>
                  {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select
                  value={selectedBrandLine || ""}
                  onChange={(e) => setSelectedBrandLine(e.target.value || null)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-600"
                >
                  <option value="">Any Brand Line</option>
                  {BRAND_LINES.map((bl) => <option key={bl} value={bl}>{bl}</option>)}
                </select>
              </div>
            </div>

            {/* Yarn Properties Group */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Yarn Profile</h4>
              <select
                value={selectedWeight || ""}
                onChange={(e) => setSelectedWeight(e.target.value || null)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-600"
              >
                <option value="">Any Yarn Weight</option>
                {YARN_WEIGHTS.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
              
              <div className="flex items-center gap-1.5 pt-1">
                {COLORS.map((color) => {
                  const active = selectedColor === color.slug;
                  return (
                    <button
                      key={color.slug}
                      title={color.name}
                      onClick={() => setSelectedColor(active ? null : color.slug)}
                      className={`w-5 h-5 rounded-full ${color.hex} hover:scale-110 transition-transform relative ${active ? "ring-2 ring-offset-2 ring-gray-950" : ""}`}
                    >
                      {active && <span className="absolute inset-0 flex items-center justify-center text-[9px] text-white font-bold">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formats & Platforms */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Delivery & Platform</h4>
              <select
                value={selectedFormat || ""}
                onChange={(e) => setSelectedFormat(e.target.value || null)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-600"
              >
                <option value="">Any Document Format</option>
                {PATTERN_FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <select
                value={selectedSource || ""}
                onChange={(e) => setSelectedSource(e.target.value || null)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-600"
              >
                <option value="">Any Marketplace Source</option>
                {PURCHASE_SOURCES.map((ps) => <option key={ps} value={ps}>{ps}</option>)}
              </select>
            </div>

            {/* Specific Technical Sizing Dimensions */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Technical Spec Limits</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Hook Size (mm)"
                  value={hookSize}
                  onChange={(e) => setHookSize(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-200 bg-white rounded-lg text-xs font-medium placeholder:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Finished Size"
                  value={productSize}
                  onChange={(e) => setProductSize(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-200 bg-white rounded-lg text-xs font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* RESULT CONTENT BLOCK */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="text-xs text-gray-400 font-medium tracking-wide">
          Showing <span className="text-gray-800">{startItemIndex}</span> – <span className="text-gray-800">{endItemIndex}</span> of <span className="text-gray-800">{totalItems}</span> patterns
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {patterns.map((pattern) => (
            <PatternListItem
              dict={dictPatternItem}
              key={pattern.slug}
              pattern={pattern}
            />
          ))}
        </div>
      </main>

    </div>
  );
}
