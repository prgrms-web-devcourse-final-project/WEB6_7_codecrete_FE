"use client";

import { useSyncExternalStore } from "react";

const BREAKPOINTS = [
  { minWidth: 1280, cols: 5 }, // xl
  { minWidth: 1024, cols: 3 }, // lg
  { minWidth: 0, cols: 2 }, // default
] as const;

const getColumns = (): number =>
  BREAKPOINTS.find(({ minWidth }) => window.innerWidth >= minWidth)?.cols ?? 2;

const subscribeToResize = (callback: () => void): (() => void) => {
  const observer = new ResizeObserver(callback);
  observer.observe(document.documentElement);
  return () => observer.disconnect();
};

/**
 * @description 현재 뷰포트에 맞는 그리드 컬럼 수를 반환하는 Custom Hook
 * Tailwind 브레이크포인트(lg, xl)와 동기화
 */
export function useGridColumns(): number {
  return useSyncExternalStore(
    subscribeToResize, // 구독 함수
    getColumns, // 클라이언트 스냅샷
    () => 2 // 서버 스냅샷 (SSR 초기값)
  );
}
