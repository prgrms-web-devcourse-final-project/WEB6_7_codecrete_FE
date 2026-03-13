"use client";

import { Concert } from "@/types/home";
import { getLikedConcertList } from "@/lib/api/myPage/myPage.client";
import { toast } from "sonner";
import ConcertCard from "@/components/concert/ConcertCard";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SpotlightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaginationPages from "@/components/common/PaginationPages";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/usePagination";
import { PAGE_SIZE } from "@/constants/pagination";

export default function MyPageLikedConcertList({
  initialList,
  totalCount,
}: {
  initialList: Concert[] | null;
  totalCount: number;
}) {
  const {
    data: concertsList,
    currentPage,
    totalPages,
    isLoading,
    isFirstPage,
    isLastPage,
    pageRange,
    goToPage,
    goPrevPage,
    goNextPage,
  } = usePagination<Concert>({
    totalItems: totalCount,
    itemsPerPage: PAGE_SIZE,
    initialData: initialList,
    fetcher: async (page) => {
      try {
        const response = await getLikedConcertList({ page: page - 1, size: PAGE_SIZE });
        return response.data ?? [];
      } catch (error) {
        console.error("Error loading liked concerts:", error);
        toast.error("공연 목록을 불러오는데 실패했습니다.");
        throw error;
      }
    },
  });

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    goToPage(page);
  };

  const handlePrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goPrevPage();
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goNextPage();
  };

  if (totalCount === 0 || !concertsList || concertsList.length === 0) {
    return (
      <>
        <div className="flex justify-between">
          <h3 className="text-lg font-bold lg:text-xl">찜한 공연</h3>
          <p className="text-text-sub text-xs leading-normal lg:text-sm">총 0개</p>
        </div>
        <div className="py-2 lg:py-40">
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
        <h3 className="text-lg font-bold lg:text-xl">찜한 공연</h3>
        <p className="text-text-sub text-sm">총 {totalCount}개</p>
      </div>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <p>로딩 중...</p>
        </div>
      ) : (
        <>
          <div className="list grid grid-cols-2 gap-x-4 gap-y-8 pb-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
            {concertsList.map((concert) => (
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
                    onClick={handlePrev}
                    aria-disabled={isFirstPage}
                    className={cn(
                      isFirstPage && "pointer-events-none opacity-50",
                      "[&>:not(svg)]:hidden"
                    )}
                  />
                </PaginationItem>
                <PaginationPages
                  pageRange={pageRange}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={handleNext}
                    aria-disabled={isLastPage}
                    className={cn(
                      isLastPage && "pointer-events-none opacity-50",
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
