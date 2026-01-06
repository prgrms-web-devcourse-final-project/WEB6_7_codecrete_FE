"use client";

import { Concert } from "@/types/home";
import { useEffect, useState } from "react";
import { getLikedConcertList } from "@/lib/api/myPage/myPage.client";
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
import ConcertCard from "@/components/concert/ConcertCard";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SpotlightIcon } from "lucide-react";

export default function MyPageLikedConcertList({
  initialList,
  totalCount,
}: {
  initialList: Concert[] | null;
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
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
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
    } else {
      // 5개 초과: 1 ... 중간3개 ... 끝
      const showStart = currentPage <= 3;
      const showEnd = currentPage >= totalPages - 2;

      if (showStart) {
        // 앞쪽: 1 2 3 4 ... 끝
        for (let i = 1; i <= 4; i++) {
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
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href="#" onClick={(e) => handlePageChange(e, totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (showEnd) {
        // 뒤쪽: 1 ... 끝-3 끝-2 끝-1 끝
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={(e) => handlePageChange(e, 1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
        for (let i = totalPages - 3; i <= totalPages; i++) {
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
      } else {
        // 중간: 1 ... 현재-1 현재 현재+1 ... 끝
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={(e) => handlePageChange(e, 1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
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
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href="#" onClick={(e) => handlePageChange(e, totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  if (totalCount === 0 || !concertsList || concertsList.length === 0) {
    return (
      <>
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">찜한 공연</h3>
          <p className="text-text-sub text-sm">총 0개</p>
        </div>
        <div className="py-40">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SpotlightIcon />
              </EmptyMedia>
              <EmptyTitle>찜한 공연이 없습니다.</EmptyTitle>
              <EmptyDescription>좋아하는 공연을 찜해보세요!</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
