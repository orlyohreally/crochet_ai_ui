"use client"; // TODO: it was not a client component
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  PatternDashboardData,
  SearchCategory,
  SearchLabel,
  SearchPatternLevel,
} from "@/lib/interfaces";

import Dashboard from "@/components/Dashboard";
import DashboardHeader from "./PatternsHeader";
import EmptyPatternsList from "./EmptyPatternsList";
import PatternList from "./PatternsList";
import { COMPLEXITIES } from "./constants";
import PatternListItem from "./PatternsListItem";
import { useLang } from "@/context/LangContext";
import CategoryFilter from "./CategoryFilter";
import LabelsFilter from "./LabelsFilter";
import PatternLevelFilter from "./PatternLevelFilter";
import BooleanFilter from "./BooleanFilter";
import CategoryFilter2 from "./CategoryFilter2";

export default function PatternsDashboard({
  categories,
  labels,
  pageSize,
  patternsDashboardData,
  patternLevels,
  selectedIsFree,
  initialCategory,
  initialLabels = [],
  initialPatternLevels = [],
  page = 1,
}: {
  categories: SearchCategory[];
  labels: SearchLabel[];
  initialCategory: string | undefined;
  initialLabels: string[];
  patternLevels: SearchPatternLevel[];
  page: number;
  pageSize: number;
  patternsDashboardData: PatternDashboardData;
  initialPatternLevels: string[];
  selectedIsFree?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("initialLabels", initialLabels);
  const { dict } = useLang();
  const dictPatternItem = dict.patternItem as { [key: string]: string };

  const totalItems = 7;
  const startItemIndex =
    totalItems === patternsDashboardData.totalPages
      ? 0
      : (page - 1) * pageSize + 1;
  const endItemIndex = Math.min(page * pageSize, totalItems);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("-created_at");
  console.log("initialCategory", initialCategory);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory,
  );
  const [selectedLabels, setSelectedLabels] = useState<string[]>(initialLabels);
  const [selectedPatternLevels, setSelectedPatternLevels] =
    useState<string[]>(initialPatternLevels);
  const [isFree, setIsFree] = useState<boolean | undefined>(selectedIsFree);

  // UI Expandable Toggles
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [expandLabels, setExpandLabels] = useState(false);

  // Pagination Meta
  const [currentPage, setCurrentPage] = useState(1);

  const hasSelectedFilters =
    selectedCategory ||
    selectedLabels.length > 0 ||
    selectedPatternLevels ||
    isFree !== undefined ||
    search;
  // selectedBrand ||
  // selectedBrandLine ||
  // selectedWeight ||
  // selectedColor ||
  // selectedFormat ||
  // selectedSource ||
  // hookSize ||
  // productSize ||

  function handlePageSizeChange(newPageSize: number) {
    const url = new URL(window.location.href);
    url.searchParams.set("page_size", newPageSize.toString());

    router.push(`${pathname}?${url.searchParams.toString()}`);
  }

  function handleMultipleValueFilterChange(
    filterSlug: string,
    values: string[],
  ) {
    console.log("setSelectedLabels", values);
    setSelectedLabels(values);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(filterSlug);

    values.forEach((value) => {
      params.append(filterSlug, value);
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleLabelsChange(labelsSlugs: string[]) {
    setSelectedLabels(labelsSlugs);
    handleMultipleValueFilterChange("labels", labelsSlugs);
  }

  function handlePatternLevelChange(levelsSlugs: string[]) {
    setSelectedPatternLevels(levelsSlugs);
    handleMultipleValueFilterChange("level", levelsSlugs);
  }

  function handleSingleValueFilterChange(
    filterSlug: string,
    value?: string | boolean,
  ) {
    console.log("handleSingleFilterChange", filterSlug, value);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(filterSlug);

    if (value !== undefined) {
      params.append(filterSlug, String(value));
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleCategoryChange(value?: string) {
    setSelectedCategory(value);
    handleSingleValueFilterChange("category", value);
  }

  function handleAccessChange(value?: boolean) {
    console.log("CHABGE", value);
    setIsFree(value);
    handleSingleValueFilterChange("isFree", value);
  }

  function handleSortByChange(value: string) {
    console.log("params.append(filterSlug, String(value));")
    setSortBy(value)
    const params = new URLSearchParams(searchParams.toString());
    params.append("ordering", value);
  }

  const clearAllFilters = () => {
    setSelectedCategory(undefined);
    setSelectedLabels([]);
    setSelectedPatternLevels([]);
    setIsFree(undefined);
    // setSelectedBrand(null);
    // setSelectedBrandLine(null);
    // setSelectedWeight(null);
    // setSelectedColor(null);
    // setSelectedFormat(null);
    // setSelectedSource(null);
    // setHookSize("");
    // setProductSize("");
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen text-gray-900 antialiased font-sans bg-zinc-50/40">
      <DashboardHeader
        search={search}
        handleSearchChange={setSearch}
        itemsPerPage={pageSize}
        handlePageSizeChange={handlePageSizeChange}
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}
      >
        <div className="max-w-7xl mx-auto px-6 pb-4 pt-2 border-t border-gray-100 space-y-4">
          {/* Categories Grid/Row */}
          <CategoryFilter
            categories={[...categories, ...categories]}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />

          {/* <CategoryFilter2
            labels={labels}
            selectedLabels={selectedLabels}
            setSelectedLabels={handleLabelsChange}
          /> */}

          {/* Labels Grid/Row */}
          <LabelsFilter
            labels={labels}
            selectedLabels={selectedLabels}
            setSelectedLabels={handleLabelsChange}
          />
          {/* Global Meta Line: Complexity, Access & Advanced Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-y-3 pt-2 border-t border-zinc-100">
            <div className="flex flex-wrap items-center gap-6">
              <PatternLevelFilter
                patternLevels={patternLevels}
                selectedPatternLevels={selectedPatternLevels}
                setSelectedPatternLevels={handlePatternLevelChange}
              />

              <BooleanFilter
                filterLabel="Access"
                undefinedValueLabel="All"
                trueValueLabel="Free"
                falseValueLabel="premium"
                onValueChange={handleAccessChange}
                value={isFree}
              />
            </div>
          </div>
        </div>
      </DashboardHeader>
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="text-xs text-gray-400 font-medium tracking-wide">
          Showing <span className="text-gray-800">{startItemIndex}</span> –{" "}
          <span className="text-gray-800">{endItemIndex}</span> of{" "}
          <span className="text-gray-800">{totalItems}</span> patterns
        </div>

        {patternsDashboardData.results.length === 0 ? (
          <EmptyPatternsList />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patternsDashboardData.results.map((pattern) => (
              <PatternListItem
                dict={dictPatternItem}
                key={pattern.slug}
                pattern={pattern}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
