"use client";
import { usePathname, useSearchParams } from "next/navigation";

import PreviousPageLink from "./PreviousPageLink";
import NextPageLink from "./NextPageLink";
import PageLink from "./PageLink";

// Helper function to calculate which page numbers/ellipses to display
function getVisiblePages(currentPage: number, totalPages: number) {
  // If total pages is small (e.g., 7 or less), just show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  
  // Always include the first page
  pages.push(1);

  // Calculate mid-range boundaries
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  // Handle left ellipsis
  if (startPage > 2) {
    pages.push("...");
  } else if (startPage === 2) {
    // If the gap is exactly 1 page, just show the number instead of an ellipsis
    pages.push(2);
  }

  // Add the middle block of pages
  for (let i = startPage; i <= endPage; i++) {
    // Avoid duplicating page 2 if it was already pushed above
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Handle right ellipsis
  if (endPage < totalPages - 1) {
    pages.push("...");
  } else if (endPage === totalPages - 1) {
    // If the gap is exactly 1 page, just show the number
    if (!pages.includes(totalPages - 1)) {
      pages.push(totalPages - 1);
    }
  }

  // Always include the last page
  if (!pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return pages;
}

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
  const visiblePages = getVisiblePages(currentPage, totalPages);

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
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400 select-none cursor-default pointer-events-none"
              >
                ...
              </span>
            );
          }

          return (
            <PageLink
              key={page}
              href={createPageURL(page)}
              isActive={page === currentPage}
              page={page as number}
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
