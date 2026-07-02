"use client"; // TODO: it was not a client component
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  PatternDashboardData,
  SearchCategory,
  SearchLabel,
  SearchPatternLevel,
} from "@/lib/interfaces";

import DashboardHeader from "./PatternsHeader";
import EmptyPatternsList from "./EmptyPatternsList";
import PatternListItem from "./PatternsListItem";
import { useLang } from "@/context/LangContext";
import BooleanFilter from "./BooleanFilter";
import MultiSelectorFilter from "./MultiSelectorFilter";
import Pagination from "../Dashboard/DashboardPagination";
import { SortBySelect } from "./SortBySelect";
import { SORT_BY } from "./constants";

export default function PatternsDashboard({
  categories,
  labels,
  pageSize,
  patternsDashboardData,
  patternLevels,
  initialCategories,
  initialLabels = [],
  initialPatternLevels = [],
  initialSortBy,
  initialIsFree,
  page = 1,
}: {
  categories: SearchCategory[];
  labels: SearchLabel[];
  initialCategories: string[];
  initialLabels: string[];
  patternLevels: SearchPatternLevel[];
  page: number;
  pageSize: number;
  patternsDashboardData: PatternDashboardData;
  initialPatternLevels: string[];
  initialIsFree?: boolean;
  initialSortBy?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { dict } = useLang();
  const dictPatternItem = dict.patternItem as { [key: string]: string };
  const dictPatternDashboard = dict.patternDashboard as {
    [key: string]: string;
  };

  const totalItems = patternsDashboardData.count;
  const startItemIndex =
    totalItems === patternsDashboardData.totalPages
      ? 0
      : (page - 1) * pageSize + 1;
  const endItemIndex = Math.min(page * pageSize, totalItems);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState(initialSortBy);
  const sortByOptions = Object.entries(SORT_BY).map(
    ([sortByKey, { value }]) => ({ key: sortByKey, value }),
  );
  console.log("Object.entries(SORT_BY)", Object.entries(SORT_BY), "sortByOptions", sortByOptions)

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(initialLabels);
  const [selectedPatternLevels, setSelectedPatternLevels] =
    useState<string[]>(initialPatternLevels);
  const [isFree, setIsFree] = useState<boolean | undefined>(initialIsFree);

  // UI Expandable Toggles
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [expandLabels, setExpandLabels] = useState(false);

  // Pagination Meta
  const [currentPage, setCurrentPage] = useState(1);

  const hasSelectedFilters =
    selectedCategories.length > 0 ||
    selectedLabels.length > 0 ||
    selectedPatternLevels.length > 0 ||
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
    const params = new URLSearchParams(searchParams.toString());
    params.delete(filterSlug);

    values.forEach((value) => {
      params.append(filterSlug, value);
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleLabelsChange(labelsSlugs: string[]) {
    setSelectedLabels(labelsSlugs);
    handleMultipleValueFilterChange("label", labelsSlugs);
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

  function handleCategoryChange(labelsSlugs: string[]) {
    setSelectedCategories(labelsSlugs);
    handleMultipleValueFilterChange("category", labelsSlugs);
  }

  function handleAccessChange(value?: boolean) {
    console.log("CHABGE", value);
    setIsFree(value);
    handleSingleValueFilterChange("isFree", value);
  }

  function handleSortByChange(value: string) {
    console.log("params.append(filterSlug, String(value));");
    setSortBy(value);
    handleSingleValueFilterChange("ordering", value);
  }

  const clearAllFilters = () => {
    setSelectedCategories([]);
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
    <div className="text-gray-900 antialiased font-sans bg-zinc-50/40">
      <DashboardHeader
        search={search}
        handleSearchChange={setSearch}
        hasAiAccess={true}
        onSendAiPrompt={(prompt) => {
          console.log("AI Prompt:", prompt);
        }}
      >
        <div className="max-w-7xl mx-auto px-6 pb-4 pt-2 border-t border-gray-100 flex gap-3 items-center  overflow-x-auto scrollbar-none w-full min-w-0">
          <SortBySelect
            dict={dictPatternDashboard}
            sortBy={sortBy}
            handleSortByChange={handleSortByChange}
            sortByOptions={sortByOptions}
          />
          <BooleanFilter
            filterLabel="Access"
            undefinedValueLabel="All"
            trueValueLabel="Free"
            falseValueLabel="premium"
            onValueChange={handleAccessChange}
            value={isFree}
          />

          <div className="h-4 w-px bg-gray-200 shrink-0"></div>

          <MultiSelectorFilter
            selectorLabel="Categories"
            allSelectedLabel="All Categories"
            options={categories}
            selectedOptions={selectedCategories}
            setSelectedOptions={handleCategoryChange}
            renderOption={(category) => (
              <span className="text-xs font-medium text-gray-600">
                {category.patternCount}
              </span>
            )}
          />
          <MultiSelectorFilter
            selectorLabel="Labels"
            allSelectedLabel="All Labels"
            options={labels}
            selectedOptions={selectedLabels}
            setSelectedOptions={handleLabelsChange}
            renderOption={(label) => (
              <span className="text-xs font-medium text-gray-600">
                {label.patternCount}
              </span>
            )}
          />
          <MultiSelectorFilter
            selectorLabel="Levels"
            allSelectedLabel="All Levels"
            options={patternLevels}
            selectedOptions={selectedPatternLevels}
            setSelectedOptions={handlePatternLevelChange}
            renderOption={(level) => (
              <span className="text-xs font-medium text-gray-600">
                {level.patternCount}
              </span>
            )}
          />
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
      <Pagination
        totalItems={totalItems}
        currentPage={page}
        pageSize={pageSize}
      />
    </div>
  );
}
