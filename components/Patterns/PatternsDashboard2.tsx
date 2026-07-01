import { PatternDashboardData, SearchCategory } from "@/lib/interfaces";

// import Dashboard from "@/components/DashboardV2";
// import DashboardHeader from "@/components/DashboardV2/DashboardHeader";
// import EmptyPatternsList from "./EmptyPatternsList";
import PatternList2New from "./PatternList2New";


export default function PatternsDashboard({
  patternsDashboardData,
  categories,
  page = 1,
  pageSize,
}: {
  categories: SearchCategory[];
  page: number;
  pageSize: number;
  patternsDashboardData: PatternDashboardData;
}) {
  return (
    <PatternList2New  patterns={patternsDashboardData.results} categories={categories}/>

  );
}
