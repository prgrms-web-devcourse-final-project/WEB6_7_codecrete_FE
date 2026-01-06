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
import { useState } from "react";
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

const ITEMS_PER_PAGE = 12;

export default function MyPageLikedArtistList({
  initialList,
}: {
  initialList: LikedArtist[] | null;
}) {
  const artistList = initialList || [];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(artistList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedArtists = artistList.slice(startIndex, endIndex);

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      const showStart = currentPage <= 3;
      const showEnd = currentPage >= totalPages - 2;

      if (showStart) {
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

  if (artistList.length === 0)
    return (
      <>
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">찜한 아티스트</h3>
          <p className="text-text-sub text-sm">총 0명</p>
        </div>
        <div className="py-40">
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
        <h3 className="text-xl font-bold">찜한 아티스트</h3>
        <p className="text-text-sub text-sm">총 {artistList.length}명</p>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {displayedArtists.map((artist) => (
          <MyPageLikedArtistListItem key={artist.id} artist={artist} />
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
  );
}
