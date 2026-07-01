"use client";
import { useLang } from "@/context/LangContext";
import { NestedDictionary } from "@/lib/interfaces";
import { useState, useEffect } from "react";
import ShareButton from "@/components/ShareButton";

export default function DashboardHeader({
  search,
  handleSearchChange,
  itemsPerPage,
  handlePageSizeChange,
  sortBy,
  handleSortByChange,
  children,
}: {
  children: React.ReactNode;
  search: string;
  itemsPerPage: number;
  sortBy: string;
  handleSortByChange: (sortBy: string) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  handleSearchChange: (search: string) => void;
}) {
  //  const { dict } = useLang();
  //  const dictPatternDashboard = dict.patternDashboard as NestedDictionary
  const [shareCopied, setShareCopied] = useState(false);

  const handleShareCatalog = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "WebShare API Demo",
          url: "https://codepen.io/ayoisaiah/pen/YbNazJ",
        });
        console.log("Thanks for sharing!");
      } catch (e) {
        console.log("ERROR");
      }
      setShareCopied(true);
    }
  };

  return (
    <header
      className="bg-white border-b border-gray-200 shadow-sm"
    >
      
      {/* ROW 1: Inline Title + Search Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-1 items-center gap-6 max-w-2xl">
          <h1 className="text-xl font-light tracking-wide text-gray-950 shrink-0">
            Discover
          </h1>
          <div className="relative flex-1">
            <input
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Type keywords, yarn, or designer..."
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-zinc-50 transition-all text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              handlePageSizeChange(Number(e.target.value));
            }}
            className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600 focus:outline-none"
          >
            <option value={12}>12 items</option>
            <option value={24}>24 items</option>
            <option value={48}>48 items</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => handleSortByChange(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600 focus:outline-none"
          >
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
        
      </div>
      {children}
    </header>
  );
}
