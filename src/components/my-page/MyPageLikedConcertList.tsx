"use client";

import { Concert } from "@/types/home";
import ConcertCard from "../concert/ConcertCard";
import { useEffect, useState } from "react";
import { getLikedConcertList } from "@/lib/api/myPage.client";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { twMerge } from "tailwind-merge";
import { PAGE_SIZE } from "@/utils/helpers/constants";

export default function MyPageLikedConcertList({
  initialList,
  totalCount,
}: {
  initialList: Concert[];
  totalCount: number;
}) {
  const [concertsList, setConcertsList] = useState(initialList);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const response = await getLikedConcertList({ page: page - 1, size: PAGE_SIZE });
      setConcertsList(response.data || []);
    } catch (error) {
      console.error("Error loading liked concerts:", error);
      toast.error("공연 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    loadPage(page);
  };

  useEffect(() => {
    setConcertsList(initialList);
    setCurrentPage(1);
  }, [initialList]);

  const renderPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={(e) => handlePageChange(e, 1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => handlePageChange(e, i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={(e) => handlePageChange(e, totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="mx-auto max-w-400 space-y-8">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">찜한 공연</h3>
        <p className="text-text-sub text-sm">총 {totalCount}개</p>
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <p>로딩 중...</p>
        </div>
      ) : (
        <>
          <div className="list grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {concertsList.map((concert: Concert) => (
              <ConcertCard
                key={concert.id}
                id={Number(concert.id)}
                posterUrl={concert.posterUrl}
                name={concert.name}
                startDate={concert.startDate}
                endDate={concert.endDate}
                placeName={concert.placeName}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => handlePageChange(e, currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    className={twMerge(
                      currentPage === 1 && "pointer-events-none opacity-50",
                      "[&>:not(svg)]:hidden"
                    )}
                  />
                </PaginationItem>

                {renderPageNumbers()}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => handlePageChange(e, currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                    className={twMerge(
                      currentPage === totalPages && "pointer-events-none opacity-50",
                      "[&>:not(svg)]:hidden"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
