import { PatternDashboardData } from "@/lib/interfaces";

import Dashboard from "@/components/Dashboard";
import PatternList from "./PatternsList";

export default function Patterns({
  patternsDashboardData,
  page = 1,
  pageSize = 2,
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
