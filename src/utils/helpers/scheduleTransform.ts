import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import {
  ScheduleDetail,
  Itinerary,
  KakaoMapSummary,
  TMapWalkRoute,
  Coords,
  TMapSummary,
} from "@/types/planner";

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
 * 이동(TRANSPORT) 일정을 자동 생성
 * @param fromSchedule - 출발 일정
 * @param toSchedule - 도착 일정
 * @param context - 경로 정보(선택된 이동 수단 및 소요 시간 등)
 */
export function transformTransportSchedule(
  fromSchedule: ScheduleDetail,
  toSchedule: ScheduleDetail,
  context: TransportTransformContext
): ScheduleDetail {
  const { selectedRoute, carRouteSummary, walkRouteSummary } = context;

  // 출발 일정의 종료 시간 계산
  const startTime = getScheduleEndTime(fromSchedule);

  // 이동수단 기본 정보
  let scheduleData: ScheduleDetail = {
    scheduleType: "TRANSPORT",
    title: `${fromSchedule.title} → ${toSchedule.title}`,
    duration: 30, // 기본값
    transportType: "PUBLIC_TRANSPORT", // 기본값 (나중에 덮어씀)
    location: `${fromSchedule.title || "출발"} → ${toSchedule.title || "도착"}`,
    startPlaceLat: fromSchedule.locationLat,
    startPlaceLon: fromSchedule.locationLon,
    endPlaceLat: toSchedule.locationLat,
    endPlaceLon: toSchedule.locationLon,
    startAt: `${startTime}:00`,
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
// 시간 계산 헬퍼
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

/**
 * 다음 일정의 시작시간을 계산
 * 현재 일정의 종료 시간에 이동 시간과 버퍼 시간을 더해
 * 다음 일정의 시작 시간을 계산하고, 15분 단위로 올림한 시간을 반환합니다.
 *
 * @param {ScheduleDetail} currentSchedule 현재 일정 정보 (시작 시각과 소요 시간 포함)
 * @param {number} transportDurationSeconds 이동 소요 시간(초 단위)
 * @param {number} bufferMinutes 이동 후 여유 시간(분 단위, 기본값 10분)
 * @returns {string} 계산된 다음 일정 시작 시각(HH:MM 형식)
 */
export function calculateNextScheduleStartTime(
  currentSchedule: ScheduleDetail,
  transportDurationSeconds: number,
  bufferMinutes = 10
): string {
  const currentEndTime = getScheduleEndTime(currentSchedule);
  const totalMinutesToAdd = transportDurationSeconds / 60 + bufferMinutes;
  let nextStartTime = addMinutesToTime(currentEndTime, totalMinutesToAdd);

  // 15분 단위로 반올림
  const [hours, mins] = nextStartTime.split(":").map(Number);
  const roundedMins = Math.ceil(mins / 15) * 15;
  if (roundedMins === 60) {
    nextStartTime = `${String((hours + 1) % 24).padStart(2, "0")}:00`;
  } else {
    nextStartTime = `${String(hours).padStart(2, "0")}:${String(roundedMins).padStart(2, "0")}`;
  }
  return nextStartTime;
}

export function buildWalkSummary(
  totalTime: number,
  totalDistance: number,
  coords: Coords
): TMapSummary {
  return {
    metaData: {
      plan: {
        itineraries: [
          {
            totalTime,
            totalDistance,
            transferCount: 0,
            fare: {
              regular: {
                totalFare: 0,
                currency: { symbol: "￦", currency: "원", currencyCode: "KRW" },
              },
            },
            pathType: 5,
          },
        ],
      },
      requestParameters: { reqDttm: "", ...coords },
    },
  };
}
