// src/utils/helpers/scheduleTransform.ts

import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { ScheduleDetail, Itinerary, KakaoMapSummary, TMapWalkRoute } from "@/types/planner";

/**
 * 기본 일정(MEAL/WAITING/ACTIVITY/OTHER) 폼 데이터를 API용 ScheduleDetail로 변환
 */
export function transformBasicSchedule(formData: ScheduleFormData): ScheduleDetail {
  // 시간 형식 정규화 (HH:MM -> HH:MM:00)
  const normalizedStartAt = formData.startAt ? `${formData.startAt}:00` : "";
  const { placeName, placeAddress, coords } = formData;

  return {
    scheduleType: formData.scheduleType,
    title: formData.title,
    duration: formData.duration,
    location: [placeAddress, placeName].filter(Boolean).join(", "),
    locationLat: coords?.lat,
    locationLon: coords?.lon,
    startAt: normalizedStartAt,
    details: formData.details,
    estimatedCost: formData.estimatedCost || 0,
  };
}

// ============================================
// 🚗 이동 일정 변환 (나중에 사용)
// ============================================

// const DEFAULT_CAR_DURATION_MINUTES = 60;
// const DEFAULT_WALK_DURATION_MINUTES = 30;

interface TransportTransformContext {
  transportCandidates: ScheduleDetail[];
  selectedRoute: Itinerary | null;
  carRouteSummary: KakaoMapSummary | null;
  walkRouteSummary: TMapWalkRoute | null;
}

/**
 * 이동(TRANSPORT) 일정을 자동 생성할 때 사용 (Phase 2)
 * @param fromSchedule - 출발 일정
 * @param toSchedule - 도착 일정
 * @param context - 경로 정보
 */
export function transformTransportSchedule(
  fromSchedule: ScheduleDetail,
  toSchedule: ScheduleDetail,
  context: TransportTransformContext
): ScheduleDetail {
  const { selectedRoute, carRouteSummary, walkRouteSummary } = context;

  // 이동 기본 정보 설정
  let scheduleData: ScheduleDetail = {
    scheduleType: "TRANSPORT",
    title: `${fromSchedule.title} → ${toSchedule.title}`,
    duration: 30, // 기본값
    transportType: "PUBLIC_TRANSPORT",
    location: `${fromSchedule.title || "출발"} → ${toSchedule.title || "도착"}`,
    startPlaceLat: fromSchedule.locationLat,
    startPlaceLon: fromSchedule.locationLon,
    endPlaceLat: toSchedule.locationLat,
    endPlaceLon: toSchedule.locationLon,
    startAt: addMinutesToTime(fromSchedule.startAt.substring(0, 5), fromSchedule.duration) + ":00",
    details: "자동 생성된 이동 일정",
    estimatedCost: 0,
  };

  // 대중교통 경로
  if (selectedRoute) {
    const routeDurationMinutes = Math.ceil(selectedRoute.totalTime / 60);
    const selectedRouteCost = selectedRoute.fare?.regular?.totalFare || 0;

    scheduleData = {
      ...scheduleData,
      duration: routeDurationMinutes,
      estimatedCost: selectedRouteCost,
      distance: selectedRoute.totalDistance,
      transportRoute: {
        totalTime: selectedRoute.totalTime,
        totalDistance: selectedRoute.totalDistance,
        totalWalkTime: selectedRoute.totalWalkTime ?? 0,
        totalWalkDistance: selectedRoute.totalWalkDistance ?? 0,
        transferCount: selectedRoute.transferCount,
        leg: selectedRoute.legs || [],
        fare: {
          taxi: selectedRoute.fare?.regular?.totalFare,
        },
      },
    };
  }
  // 자동차 경로
  else if (carRouteSummary) {
    const carDurationMinutes = Math.ceil(carRouteSummary.duration / 60);
    scheduleData = {
      ...scheduleData,
      transportType: "CAR",
      duration: carDurationMinutes,
      estimatedCost: carRouteSummary.fare?.taxi || 0,
      distance: carRouteSummary.distance,
      transportRoute: {
        totalTime: carRouteSummary.duration,
        totalDistance: carRouteSummary.distance,
        totalWalkTime: 0,
        totalWalkDistance: 0,
        transferCount: 0,
        leg: [],
        fare: {
          taxi: carRouteSummary.fare?.taxi,
        },
      },
    };
  }
  // 도보 경로
  else if (walkRouteSummary) {
    const walkDurationMinutes = Math.ceil(walkRouteSummary.totalTime / 60);
    scheduleData = {
      ...scheduleData,
      transportType: "WALK",
      duration: walkDurationMinutes,
      distance: walkRouteSummary.totalDistance,
      transportRoute: {
        totalTime: walkRouteSummary.totalTime,
        totalDistance: walkRouteSummary.totalDistance,
        totalWalkTime: walkRouteSummary.totalTime,
        totalWalkDistance: walkRouteSummary.totalDistance,
        transferCount: 0,
        leg: [],
        fare: { taxi: undefined },
      },
    };
  }

  return scheduleData;
}

// ============================================
// 🔧 시간 계산 헬퍼 함수들
// ============================================

export function addMinutesToTime(timeStr: string, minutes: number): string {
  const [hours, mins] = timeStr.split(":").map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
}

export function getScheduleEndTime(schedule: ScheduleDetail): string {
  const startTime = schedule.startAt.substring(0, 5);
  return addMinutesToTime(startTime, schedule.duration);
}
