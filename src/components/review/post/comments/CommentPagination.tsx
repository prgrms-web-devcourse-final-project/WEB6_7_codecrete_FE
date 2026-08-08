"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationLink } from "@/components/ui/pagination";

function getPageRange(current: number, total: number, delta = 2): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const rangeStart = Math.max(2, current - delta);
  const rangeEnd = Math.min(total - 1, current + delta);

  const pages: (number | "...")[] = [1];

  if (rangeStart > 2) pages.push("...");
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < total - 1) pages.push("...");

  pages.push(total);
  return pages;
}

export default function CommentPagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages === 0) return null;

  const pages = getPageRange(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`?page=${page}`);
  };

  return (
    <Pagination className="py-12">
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationLink
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Go to previous page"
          className={isFirstPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
        >
          <ChevronLeftIcon className="size-4" />
        </PaginationLink>

        {pages.map((pageNum, idx) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="text-text-sub flex size-9 items-center justify-center select-none"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <PaginationLink
              key={pageNum}
              isActive={currentPage === pageNum}
              onClick={() => handlePageChange(pageNum)}
              className="cursor-pointer"
            >
              {pageNum}
            </PaginationLink>
          )
        )}

        {/* 다음 버튼 */}
        <PaginationLink
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          // disabled={isLastPage}
          aria-label="Go to next page"
          className={isLastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
        >
          <ChevronRightIcon className="size-4" />
        </PaginationLink>
      </PaginationContent>
    </Pagination>
  );
}
