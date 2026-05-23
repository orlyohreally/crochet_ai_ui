import { PatternDashboardData } from "@/lib/interfaces";

import Dashboard from "@/components/Dashboard";
import PatternList from "./PatternsList";

export default function PatternsDashboard({
  patternsDashboardData,
  page = 1,
  pageSize,
}: {
  page: number;
  pageSize: number;
  patternsDashboardData: PatternDashboardData;
}) {

  return (
    <Dashboard
      page={page}
      pageSize={pageSize}
      totalItems={patternsDashboardData.count}
      totalItemsSlot={
        <>All Patterns{" "}</>
      }
    >
      <PatternList patterns={patternsDashboardData.results} />
    </Dashboard>
  );
}
