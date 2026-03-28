import {
  getCarRouteSummaryByKakaoMap,
  getTransitRouteDetailsByTmap,
  getWalkRouteByTmap,
} from "@/lib/api/planner/transport.client";
import { Coords, KakaoMapSummary, TMapDetailResponse, TMapSummary } from "@/types/planner";
import { buildWalkSummary } from "@/utils/helpers/scheduleTransform";
import { skipToken, UseQueryOptions } from "@tanstack/react-query";

export const transportQueryKeys = {
  all: ["transport"] as const,
  car: (startX: number, startY: number, endX: number, endY: number) =>
    [...transportQueryKeys.all, "car", startX, startY, endX, endY] as const,
  transit: (startX: number, startY: number, endX: number, endY: number) =>
    [...transportQueryKeys.all, "transit", startX, startY, endX, endY] as const,
  walk: (startX: number, startY: number, endX: number, endY: number) =>
    [...transportQueryKeys.all, "walk", startX, startY, endX, endY] as const,
};

// coords가 null인 경우 API 호출을 건너뛰도록 skipToken 사용
// TS가 skipToken의 타입을 일반 symbol로 인식하는 문제가 있어 queryFn의 반환 타입을 명시적으로 지정
export const transportQueries = {
  car: (coords: Coords | null): UseQueryOptions<KakaoMapSummary> => ({
    queryKey: [...transportQueryKeys.all, "car", coords] as const,
    queryFn: coords ? () => getCarRouteSummaryByKakaoMap(coords) : skipToken,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  }),
  transit: (coords: Coords | null): UseQueryOptions<TMapDetailResponse> => ({
    queryKey: [...transportQueryKeys.all, "transit", coords] as const,
    queryFn: coords ? () => getTransitRouteDetailsByTmap(coords) : skipToken,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  }),
  walk: (coords: Coords | null): UseQueryOptions<TMapSummary> => ({
    queryKey: [...transportQueryKeys.all, "walk", coords] as const,
    queryFn: coords
      ? async () => {
          const walk = await getWalkRouteByTmap(coords);
          return buildWalkSummary(walk.totalTime, walk.totalDistance, coords);
        }
      : skipToken,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  }),
};
