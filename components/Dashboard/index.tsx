"use client";
import { useRouter, usePathname } from "next/navigation";

import Pagination from "./DashboardPagination";
import DashboardTotalItemsPanel from "./DashboardTotalItemsPanel";

export default function Dashboard({
  children,
  totalItems,
  totalItemsSlot,
  page = 1,
  pageSize = 20,
}: {
  children: React.ReactNode;
  totalItemsSlot: React.ReactNode;
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
    <main className="p-8">
      <DashboardTotalItemsPanel
        totalItems={totalItems}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      >
        {totalItemsSlot}
      </DashboardTotalItemsPanel>

      {children}

      <Pagination
        totalItems={totalItems}
        currentPage={page}
        pageSize={pageSize}
      />
    </main>
  );
}
