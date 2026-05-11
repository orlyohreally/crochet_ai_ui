import { Suspense } from "react";

import { redirect } from "next/navigation";

import { patterns } from "@/lib/patterns";

import LoadingPatternsList from "./loading";
import PatternsDashboard from "@/components/Patterns/PatternsDashboard";

export default async function Patterns({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; page_size?: string }>;
}) {
  const { page = "1", page_size: pageSize = "20" } = await searchParams;
  const currentPage = parseInt(page, 10);
  const currentPageSize = parseInt(pageSize, 10);
  let patternsList;
  try {
    patternsList = await patterns({
      page: currentPage,
      pageSize: currentPageSize,
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
          page={currentPage}
          pageSize={currentPageSize}
          patternsDashboardData={patternsList}
        />
      </Suspense>
    </div>
  );
}
