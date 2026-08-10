import { Coords, isTMapDetailClose, ScheduleDetail } from "@/types/planner";
import { useCarRoute, useTransitRoute, useWalkRoute } from "../useTransport";
import { calculateDistance } from "@/utils/helpers/geolocation";
import { useMemo } from "react";
import { calculateNextScheduleStartTime } from "@/utils/helpers/scheduleTransform";

interface UseRecommendedTimeProps {
  selectedScheduleId?: string;
  currentCoords: { lat: number; lon: number } | null;
  regularScheduleCandidates: ScheduleDetail[];
  bufferMinutes?: number;
}

export type TransportMode = "transit" | "car" | "walk";
export interface RecommendedTimes {
  duration: number;
  startAt: string;
  mode: TransportMode;
  isClose: boolean;
}

/**
 * 대중교통 / 자동차(택시) / 도보 세 가지 추천 시작 시간을 반환
 */
export function useRecommendedTime({
  regularScheduleCandidates,
  selectedScheduleId,
  currentCoords,
  bufferMinutes = 10,
}: UseRecommendedTimeProps) {
  const selectedSchedule = regularScheduleCandidates.find(
    (s) => String(s.id) === selectedScheduleId
  );

  // 출발지(이전 일정)와 도착지(다음 일정)이 모두 있을 때만 coords 생성
  const coords: Coords | null = useMemo(() => {
    return selectedSchedule?.locationLat &&
      selectedSchedule?.locationLon &&
      currentCoords?.lat &&
      currentCoords?.lon
      ? {
          startX: selectedSchedule.locationLon,
          startY: selectedSchedule.locationLat,
          endX: currentCoords.lon,
          endY: currentCoords.lat,
        }
      : null;
  }, [selectedSchedule, currentCoords]);

  const straightDistance = useMemo(() => {
    if (!coords) return 0;
    return calculateDistance(coords.startY, coords.startX, coords.endY, coords.endX);
  }, [coords]);

  const { data: transitData, isFetching: isTransitFetching } = useTransitRoute(coords);
  const { data: carData, isFetching: isCarFetching } = useCarRoute(coords);
  const { data: walkData, isFetching: isWalkFetching } = useWalkRoute(coords, straightDistance);

  // 결과를 3가지 교통수단 전부 제공
  const recommendedTimes = useMemo(() => {
    if (!selectedSchedule || !coords) return null;

    const build = (duration: number, mode: TransportMode, isClose: boolean) => ({
      duration,
      startAt: calculateNextScheduleStartTime(selectedSchedule, duration, bufferMinutes),
      mode,
      // 너무 가까울 경우 transit은 조회되지 않음
      isClose,
    });
    const result: Partial<Record<TransportMode, RecommendedTimes>> = {};

    // 대중교통: 전체 경로의 평균
    const itineraries =
      !transitData || isTMapDetailClose(transitData)
        ? []
        : (transitData.metaData?.plan?.itineraries ?? []);
    if (itineraries.length > 0) {
      const avgDuration =
        itineraries.reduce((sum, it) => sum + it.totalTime, 0) / itineraries.length;
      result["transit"] = build(
        avgDuration,
        "transit",
        !transitData || isTMapDetailClose(transitData)
      );
    }

    // 자동차
    const carDuration = carData?.duration;
    if (carDuration != null) {
      result["car"] = build(carDuration, "car", false);
    }

    // 도보
    const walkDuration = walkData?.metaData?.plan?.itineraries[0]?.totalTime;
    if (walkDuration != null) {
      result["walk"] = build(walkDuration, "walk", false);
    }

    return result;
  }, [bufferMinutes, transitData, carData, walkData, selectedSchedule, coords]);

  return {
    recommendedTimes,
    isLoading: isTransitFetching || isWalkFetching || isCarFetching,
  };
}
