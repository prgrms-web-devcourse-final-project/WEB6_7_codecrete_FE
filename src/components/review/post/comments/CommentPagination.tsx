"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationLink } from "@/components/ui/pagination";

export default function CommentPagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
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

        {/* 페이지 번호 */}
        {pages.map((pageNum) => (
          <PaginationLink
            key={pageNum}
            isActive={currentPage === pageNum}
            onClick={() => handlePageChange(pageNum)}
            className="cursor-pointer"
          >
            {pageNum}
          </PaginationLink>
        ))}

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
