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
  Category,
  SearchCategory,
  SearchLabel,
  SearchPatternLevel,
} from "@/lib/interfaces";

function parsePositiveInteger(value: string, fallback: number) {
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallback;
  }
  return parsedValue;
}

interface GuardedFilters {
  labels: string[];
  category?: string; // Guaranteed to be a single string
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

function guardListQueryParam(
  searchParamValue: string | string[] | undefined,
  validValues: string[],
): { values: string[]; hasInvalidValues: boolean } {
  console.log("guardListQueryParam", searchParamValue, "--", validValues);
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
  console.log("safeValidValues", safeValidValues, "safeValues", safeValues);
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
  }>;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const {
    page = "1",
    page_size: pageSize = "20",
    label: selectedLabels,
    isFree,
    level: selectedPatternLevel,
    category: selectedCategory,
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

  // http://localhost:3000/en/patterns?category=animals&level=easy&label=amigurumi&level=easy

  const currentPage = parsePositiveInteger(page, 1);
  const currentPageSize = parsePositiveInteger(pageSize, 20);
  let selectedIsFree;
  if (isFree === "false") {
    selectedIsFree = false;
  } else if (isFree !== "undefined" && isFree != undefined && isFree != "") {
    selectedIsFree = true;
  }

  const {
    value: initialCategory,
    hasInvalidValues: hasInvalidCategoryParamValid,
  } = guardQueryParam(
    selectedCategory,
    categoriesList.map((searchCategory: SearchCategory) => searchCategory.slug),
  );

  const {
    values: initialPatternLevels,
    hasInvalidValues: hasInvalidPatternLevelsParamValid,
  } = guardListQueryParam(
    selectedPatternLevel,
    patternLevelsList.map((level) => level.slug),
  );

  const {
    values: initialLabels,
    hasInvalidValues: hasInvalidLabelsParamValid,
  } = guardListQueryParam(
    selectedLabels,
    labelsList.map((label) => label.slug),
  );

  console.log("initialLabels", initialLabels)


  const cleanParams = new URLSearchParams();

  if (initialCategory) {
    cleanParams.append("category", initialCategory);
  }

  if (initialPatternLevels) {
    initialPatternLevels.forEach((patternLevel) => {
      cleanParams.append("level", patternLevel);
    });
  }

  if (initialLabels) {
    initialLabels.forEach((label) => {
      console.log("append labels", label)
      cleanParams.append("label", label);
    });
  }

  const queryString = cleanParams.toString();
  console.log("QUERY_STRING", queryString);
  const toRedirect =
    hasInvalidCategoryParamValid ||
    hasInvalidPatternLevelsParamValid ||
    hasInvalidLabelsParamValid;
  if (toRedirect) {
    console.log("REDIRECT", `/patterns${queryString ? `?${queryString}` : ""}`);
    redirect(`/patterns${queryString ? `?${queryString}` : ""}`);
  }
  let patternsList;
  try {
    patternsList = await patterns({
      page: currentPage,
      pageSize: currentPageSize,
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
          initialCategory={initialCategory}
          initialLabels={initialLabels}
          initialPatternLevels={initialPatternLevels}
          labels={labelsList}
          page={currentPage}
          pageSize={currentPageSize}
          patternLevels={patternLevelsList}
          patternsDashboardData={patternsList}
          selectedIsFree={selectedIsFree}
        />
      </Suspense>
    </div>
  );
}
