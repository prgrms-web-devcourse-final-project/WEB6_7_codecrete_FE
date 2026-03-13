import { PaginationEllipsis, PaginationItem, PaginationLink } from "../ui/pagination";

interface PaginationPagesProps {
  pageRange: (number | "ellipsis")[];
  currentPage: number;
  onPageChange: (e: React.MouseEvent<HTMLAnchorElement>, page: number) => void;
}

/**
 * @description pageRange 배열을 받아 페이지 번호 + Ellipsis를 렌더링하는 컴포넌트
 * @param {PaginationPagesProps} props
 */
export default function PaginationPages({
  pageRange,
  currentPage,
  onPageChange,
}: PaginationPagesProps) {
  return (
    <>
      {pageRange.map((item, index) =>
        item === "ellipsis" ? (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <PaginationItem key={item}>
            <PaginationLink
              href="#"
              onClick={(e) => onPageChange(e, item)}
              isActive={currentPage === item}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        )
      )}
    </>
  );
}
