"use client";
import { LikedArtist } from "@/types/my-page";
import MyPageLikedArtistListItem from "./MyPageLikedArtistListItem";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MicVocalIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import PaginationPages from "@/components/common/PaginationPages";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { PAGE_SIZE } from "@/constants/pagination";

export default function MyPageLikedArtistList({
  initialList,
}: {
  initialList: LikedArtist[] | null;
}) {
  const isMobile = useIsMobile();
  const artistList = initialList ?? [];

  const {
    currentPage,
    totalPages,
    displayRange,
    goToPage,
    goPrevPage,
    goNextPage,
    isFirstPage,
    isLastPage,
    pageRange,
  } = usePagination({ totalItems: artistList.length, itemsPerPage: PAGE_SIZE });

  const displayedArtists = artistList.slice(displayRange.start, displayRange.end);

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    goToPage(page);
  };

  if (artistList.length === 0)
    return (
      <>
        <div className="flex justify-between">
          <h3 className="text-lg font-bold lg:text-xl">찜한 아티스트</h3>
          <p className="text-text-sub text-xs leading-normal lg:text-sm">총 0명</p>
        </div>
        <div className="py-2 lg:py-40">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MicVocalIcon />
              </EmptyMedia>
              <EmptyTitle>찜한 아티스트가 없습니다.</EmptyTitle>
              <EmptyDescription>좋아하는 아티스트를 찜해보세요!</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </>
    );

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-lg font-bold lg:text-xl">찜한 아티스트</h3>
        <p className="text-text-sub text-sm">총 {artistList.length}명</p>
      </div>
      <div className="list grid grid-cols-2 gap-x-4 gap-y-8 pb-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
        {displayedArtists.map((artist) => (
          <MyPageLikedArtistListItem key={artist.id} artist={artist} isMobile={isMobile} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={goPrevPage}
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
                onClick={goNextPage}
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
  );
}
