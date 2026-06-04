import { PatternDashboardData } from "@/lib/interfaces";

import Dashboard from "@/components/Dashboard";
import DashboardHeader from "./PatternsHeader";
import EmptyPatternsList from "./EmptyPatternsList";
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
      totalItemsSlot={<DashboardHeader />}
    >
      {patternsDashboardData.results.length === 0 ? (
        <EmptyPatternsList />
      ) : (
        <PatternList patterns={patternsDashboardData.results} />
      )}
    </Dashboard>
  );
}
