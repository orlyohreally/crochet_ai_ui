"use client";
import { useRouter, usePathname } from "next/navigation";

import Pagination from "./DashboardPagination";
import DashboardTotalItemsPanel from "./DashboardTotalItemsPanel";
// import { DashboardHeader } from "./DashboardHeader";

export default function Dashboard({
  children,
  totalItems,
  dashboardHeaderSlot,
  page = 1,
  pageSize = 20,
}: {
  children: React.ReactNode;
  dashboardHeaderSlot: React.ReactNode;
  totalItems: number;
  page: number;
  pageSize: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handlePageSizeChange(newPageSize: number) {
    const url = new URL(window.location.href);
    url.searchParams.set("page_size", newPageSize.toString());

    router.push(`${pathname}?${url.searchParams.toString()}`);
  }

  return (
    <>
    {/* <div className="p-8"> */}
      {/* <DashboardHeader>
        
      </DashboardHeader> */}
       {dashboardHeaderSlot}
      {children}

      <Pagination
        totalItems={totalItems}
        currentPage={page}
        pageSize={pageSize}
      />
    {/* </div> */}
    </>
  );
}
