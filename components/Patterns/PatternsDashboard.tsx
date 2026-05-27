import { PatternDashboardData } from "@/lib/interfaces";

import Dashboard from "@/components/Dashboard";
import PatternList from "./PatternsList";
import DashboardHeader from "./PatternsHeader";

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
      <PatternList patterns={patternsDashboardData.results} />
    </Dashboard>
  );
}
