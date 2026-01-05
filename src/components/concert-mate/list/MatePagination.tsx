import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export const MatePagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  if (totalPages === 0) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  // TODO : 페이지 몇 개 고정으로 만들기

  return (
    <Pagination className="py-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={isFirstPage ? "#" : `?page=${currentPage - 1}`}
            aria-label="Go to previous page"
            size="icon"
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={`?page=${p}`} isActive={currentPage === p}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href={isLastPage ? "#" : `?page=${currentPage + 1}`}
            aria-label="Go to next page"
            size="icon"
          >
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
