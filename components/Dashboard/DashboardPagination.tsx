"use client";
import { usePathname, useSearchParams } from "next/navigation";
import PreviousPageLink from "./PerviousPageLink";
import NextPageLink from "./NextPageLink";
import PageLink from "./PageLink";

export default function Pagination({
  totalItems,
  currentPage,
  pageSize,
}: {
  totalItems: number;
  currentPage: number;
  pageSize: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / pageSize);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav
      className="flex items-center justify-end gap-2 mt-10"
      aria-label="Pagination"
    >
      <PreviousPageLink
        isDisabled={currentPage <= 1}
        href={createPageURL(currentPage - 1)}
      />

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          return (
            <PageLink
              key={page}
              href={createPageURL(page)}
              isActive={page === currentPage}
              page={page}
            />
          );
        })}
      </div>

      <NextPageLink
        isDisabled={currentPage >= totalPages}
        href={createPageURL(currentPage + 1)}
      />
    </nav>
  );
}
