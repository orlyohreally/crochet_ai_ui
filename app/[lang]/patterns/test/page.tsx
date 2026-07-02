import { redirect } from "next/navigation";

import { patterns } from "@/lib/patterns";
import { categories } from "@/lib/categories";

import { Locale } from "@/i18n.config";
import { SearchCategory } from "@/lib/interfaces";
import PatternsDashboard2 from "@/components/Patterns/PatternsDashboard2";

function parsePositiveInteger(value: string, fallback: number) {
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallback;
  }
  return parsedValue;
}

export default async function Patterns({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string; page_size?: string }>;
  params: Promise<{ lang: string }>;
}) {
  const { page = "1", page_size: pageSize = "20" } = await searchParams;
  const { lang } = await params;
  const currentPage = parsePositiveInteger(page, 1);
  const currentPageSize = parsePositiveInteger(pageSize, 20);
  let patternsList;
  try {
    patternsList = await patterns({
      page: currentPage,
      pageSize: currentPageSize,
      lang: lang as Locale,
      queryString: "",
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
  let categoriesList = [] as SearchCategory[];
  try {
    categoriesList = await categories({
      lang: lang as Locale,
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {/* <Suspense fallback={<LoadingPatternsList />}> */}
      <PatternsDashboard2
        page={currentPage}
        pageSize={currentPageSize}
        patternsDashboardData={patternsList}
        categories={categoriesList}
      />
      {/* </Suspense> */}
    </div>
  );
}
