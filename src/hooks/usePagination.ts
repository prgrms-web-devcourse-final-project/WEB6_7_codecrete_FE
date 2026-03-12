"use client";

import { useState } from "react";
import { useIsMobile } from "./use-mobile";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
}
interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  displayRange: {
    start: number;
    end: number;
  };
  goToPage: (page: number) => void;
  goPrevPage: () => void;
  goNextPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
  pageRange: (number | "ellipsis")[];
}

const ELLIPSIS = "ellipsis" as const;
const PAGINATION_CONFIG = {
  mobile: {
    maxVisible: 1, // 중앙에 보여질 페이지 수
    edgeThreshold: 2, // 시작/끝 그룹으로 판단하는 임계값
    edgeCount: 2, // 시작/끝 그룹에서 연속 표시할 페이지 수
  },
  desktop: {
    maxVisible: 3,
    edgeThreshold: 3,
    edgeCount: 4,
  },
} as const;

/**
 * @description 페이지네이션 상태 및 로직을 캡슐화하는 Custom Hook.
 * 모바일/데스크탑 환경에 따라 pageRange 범위가 자동으로 조정됩니다.
 * @param {UsePaginationProps} props - 전체 아이템 수와 페이지 당 아이템 수
 * @returns {UsePaginationReturn} 현재 페이지, 이동 핸들러, 페이지 범위 등
 */
export function usePagination({
  totalItems,
  itemsPerPage,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isMobile = useIsMobile();

  const config = isMobile ? PAGINATION_CONFIG.mobile : PAGINATION_CONFIG.desktop;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrevPage = () => goToPage(currentPage - 1);
  const goNextPage = () => goToPage(currentPage + 1);

  const getPageRange = () => {
    const { maxVisible, edgeThreshold, edgeCount } = config;

    const sideCount = Math.floor(maxVisible / 2); // mobile: 0, desktop: 1
    const totalVisible = 2 + maxVisible; // 1 + [...] + center + [...] + last (최소 구성)

    // 전체 페이지가 최대 보여지는 갯수 이하면 모두 표시
    if (totalPages <= totalVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 전체 페이지가 최대 보여지는 갯수 이상일 경우
    const isStartGroup = currentPage <= edgeThreshold; // 현재 페이지가 초반일 때
    const isEndGroup = currentPage >= totalPages - (edgeThreshold - 1); // 현재 페이지가 후반일 때

    if (isStartGroup) {
      // [1, 2, ..., edgeCount, ELLIPSIS, totalPages]
      return [...Array.from({ length: edgeCount }, (_, i) => i + 1), ELLIPSIS, totalPages];
    }
    if (isEndGroup) {
      // [1, ELLIPSIS, totalPages - edgeCount + 1, ..., totalPages]
      return [
        1,
        ELLIPSIS,
        ...Array.from({ length: edgeCount }, (_, i) => totalPages - edgeCount + 1 + i),
      ];
    }

    // 중앙 그룹: sideCount만큼 확장
    const centerPages = Array.from({ length: maxVisible }, (_, i) => currentPage - sideCount + i);
    return [1, ELLIPSIS, ...centerPages, ELLIPSIS, totalPages];
  };
  const pageRange = getPageRange();

  return {
    currentPage,
    totalPages,
    displayRange: {
      start: (currentPage - 1) * itemsPerPage,
      end: currentPage * itemsPerPage,
    },
    goToPage,
    goPrevPage,
    goNextPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    pageRange,
  };
}
