import { Suspense } from "react";

import { redirect } from "next/navigation";

import { patterns } from "@/lib/patterns";
import { categories } from "@/lib/categories";
import { labels } from "@/lib/labels";
import { patternLevels } from "@/lib/patternLevels";

import LoadingPatternsList from "./loading";
import PatternsDashboard from "@/components/Patterns/PatternsDashboard";
import { Locale } from "@/i18n.config";
import {
  SearchCategory,
  SearchLabel,
  SearchPatternLevel,
} from "@/lib/interfaces";
import { SORT_BY_OPTIONS } from "@/components/Patterns/constants";

function parsePositiveInteger(value: string, fallback: number) {
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallback;
  }
  return parsedValue;
}

function guardQueryParam(
  searchParamValue: string | string[] | undefined,
  validValues: string[],
) {
  if (searchParamValue === undefined) {
    return { value: undefined, hasInvalidValues: false };
  }
  if (Array.isArray(searchParamValue)) {
    // if multiple values, take the first valid value
    const safeValues = searchParamValue.filter((value) =>
      validValues.includes(value),
    );
    return {
      value: safeValues[0],
      hasInvalidValues: true,
    };
  }

  const isValidValue = validValues.includes(searchParamValue);
  return {
    value: isValidValue ? searchParamValue : undefined,
    hasInvalidValues: !isValidValue,
  };
}

function guardBooleanQueryParam(
  searchParamValue: string | string[] | undefined,
  fallbackValue: boolean | undefined,
) {
  if (searchParamValue === undefined) {
    return { value: undefined, hasInvalidValues: false };
  }
  if (Array.isArray(searchParamValue)) {
    return { value: fallbackValue, hasInvalidValues: true };
  }

  const normalized = searchParamValue.toLowerCase().trim();

  if (normalized === "true" || normalized === "1")
    return { value: true, hasInvalidValues: false };
  if (normalized === "false" || normalized === "0")
    return { value: false, hasInvalidValues: false };

  return {
    value: fallbackValue,
    hasInvalidValues: true,
  };
}

function guardListQueryParam(
  searchParamValue: string | string[] | undefined,
  validValues: string[],
): { values: string[]; hasInvalidValues: boolean } {
  if (searchParamValue === undefined) {
    return { values: [], hasInvalidValues: false };
  }

  const safeValues = Array.isArray(searchParamValue)
    ? searchParamValue
    : searchParamValue
      ? [searchParamValue]
      : [];

  const safeValidValues = Array.from(
    new Set(safeValues.filter((value) => validValues.includes(value))),
  );

  return {
    values: safeValidValues,
    hasInvalidValues: safeValidValues.length !== safeValues.length,
  };
}

export default async function Patterns({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    page?: string;
    page_size?: string;
    label: string[];
    level: string[];
    isFree?: string;
    category?: string;
    ordering?: string;
  }>;
  params: Promise<{ lang: string }>;
}) {
  console.log("------PAGE RELOAD-----");
  const { lang } = await params;

  const {
    page = "1",
    page_size: pageSize = "20",
    label: selectedLabels,
    isFree,
    level: selectedPatternLevel,
    category: selectedCategories,
    ordering: selectedSortBy,
    ...unsupportedParams
  } = await searchParams;

  let categoriesList = [] as SearchCategory[];
  let labelsList = [] as SearchLabel[];
  let patternLevelsList = [] as SearchPatternLevel[];

  try {
    [categoriesList, labelsList, patternLevelsList] = await Promise.all([
      categories({ lang: lang as Locale }),
      labels({ lang: lang as Locale }),
      patternLevels({ lang: lang as Locale }),
    ]);
  } catch (err) {
    console.log(err);
  }

  const currentPage = parsePositiveInteger(page, 1);
  const currentPageSize = parsePositiveInteger(pageSize, 20);

  const { value: initialIsFree, hasInvalidValues: hasInvalidIsFreeParam } =
    guardBooleanQueryParam(isFree, undefined);

  const {
    values: initialCategories,
    hasInvalidValues: hasInvalidCategoryParam,
  } = guardListQueryParam(
    selectedCategories,
    categoriesList.map((searchCategory: SearchCategory) => searchCategory.slug),
  );

  const {
    values: initialPatternLevels,
    hasInvalidValues: hasInvalidPatternLevelsParam,
  } = guardListQueryParam(
    selectedPatternLevel,
    patternLevelsList.map((level) => level.slug),
  );

  const { values: initialLabels, hasInvalidValues: hasInvalidLabelsParam } =
    guardListQueryParam(
      selectedLabels,
      labelsList.map((label) => label.slug),
    );

  const { value: initialSortBy, hasInvalidValues: hasInvalidSortByParam } =
    guardQueryParam(selectedSortBy, SORT_BY_OPTIONS);

  console.log("initialSortBy", initialSortBy, hasInvalidSortByParam);

  const cleanParams = new URLSearchParams();

  if (initialIsFree !== undefined) {
    cleanParams.set("isFree", initialIsFree.toString());
  }

  if (initialCategories) {
    initialCategories.forEach((category) => {
      cleanParams.append("category", category);
    });
  }

  if (initialPatternLevels) {
    initialPatternLevels.forEach((patternLevel) => {
      cleanParams.append("level", patternLevel);
    });
  }

  if (initialLabels) {
    initialLabels.forEach((label) => {
      cleanParams.append("label", label);
    });
  }

  const queryString = cleanParams.toString();

  const toRedirect =
    hasInvalidCategoryParam ||
    hasInvalidPatternLevelsParam ||
    hasInvalidLabelsParam ||
    hasInvalidIsFreeParam ||
    hasInvalidSortByParam;

  if (toRedirect || Object.keys(unsupportedParams).length > 0) {
    console.log("REDIRECT", `/patterns${queryString ? `?${queryString}` : ""}`);
    redirect(`/patterns${queryString ? `?${queryString}` : ""}`);
  }
  let patternsList;
  try {
    patternsList = await patterns({
      page: currentPage,
      pageSize: currentPageSize,
      queryString,
      lang: lang as Locale,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_PAGE") {
      const params = new URLSearchParams({
        page: "1",
        page_size: currentPageSize.toString(),
      });
      redirect(`/patterns?${params.toString()}`);
    } else {
      throw error;
    }
  }

  return (
    <div>
      <Suspense fallback={<LoadingPatternsList />}>
        <PatternsDashboard
          categories={categoriesList}
          initialCategories={initialCategories}
          initialLabels={initialLabels}
          initialPatternLevels={initialPatternLevels}
          labels={labelsList}
          page={currentPage}
          pageSize={currentPageSize}
          patternLevels={patternLevelsList}
          patternsDashboardData={patternsList}
          initialIsFree={initialIsFree}
          initialSortBy={selectedSortBy}
        />
      </Suspense>
    </div>
  );
}
