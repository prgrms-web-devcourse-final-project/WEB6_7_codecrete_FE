import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { ScheduleDetail, Itinerary, KakaoMapSummary, TMapWalkRoute } from "@/types/planner";

// 경로 정보 조회 실패 시 사용할 기본 소요 시간 (분)
const DEFAULT_CAR_DURATION_MINUTES = 60;
const DEFAULT_WALK_DURATION_MINUTES = 30;

interface TransformContext {
  transportCandidates: ScheduleDetail[];
  selectedRoute: Itinerary | null;
  carRouteSummary: KakaoMapSummary | null;
  walkRouteSummary: TMapWalkRoute | null;
}

export function transformToScheduleDetail(
  formData: ScheduleFormData,
  context: TransformContext
): ScheduleDetail {
  const { transportCandidates, selectedRoute, carRouteSummary, walkRouteSummary } = context;

  // 시간 형식 정규화 (HH:MM -> HH:MM:00)
  const normalizedStartAt = formData.startAt ? `${formData.startAt}:00` : "";

  // 기본 스케줄 데이터
  let scheduleData: ScheduleDetail = {
    scheduleType: formData.scheduleType,
    title: formData.title,
    duration: formData.duration,
    location: "",
    startAt: normalizedStartAt,
    details: formData.details,
    estimatedCost: formData.estimatedCost || 0,
  };

  // 일반 스케줄 (MEAL, WAITING, ACTIVITY, OTHER)
  if (formData.scheduleType !== "TRANSPORT") {
    const { placeName, placeAddress, coords } = formData;

    scheduleData.location = [placeAddress, placeName].filter(Boolean).join(", ");
    scheduleData.locationLat = coords?.lat;
    scheduleData.locationLon = coords?.lon;

    return scheduleData;
  }

  // 이동 스케줄 (TRANSPORT)
  const { startScheduleId, endScheduleId, transportType } = formData;

  const startSchedule = transportCandidates.find((s) => String(s.id) === startScheduleId);
  const endSchedule = transportCandidates.find((s) => String(s.id) === endScheduleId);

  if (!startSchedule || !endSchedule) {
    throw new Error("출발/도착 일정 정보를 찾을 수 없습니다.");
  }

  // 이동 기본 정보 설정
  scheduleData = {
    ...scheduleData,
    transportType,
    location: `${startSchedule.title || "출발"} → ${endSchedule.title || "도착"}`,
    startPlaceLat: startSchedule.locationLat,
    startPlaceLon: startSchedule.locationLon,
    endPlaceLat: endSchedule.locationLat,
    endPlaceLon: endSchedule.locationLon,
    startAt: normalizedStartAt || startSchedule.startAt,
  };

  // 대중교통 경로 선택
  if (transportType === "PUBLIC_TRANSPORT" && selectedRoute) {
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
  else if (transportType === "CAR") {
    if (carRouteSummary) {
      const carDurationMinutes = Math.ceil(carRouteSummary.duration / 60);
      scheduleData = {
        ...scheduleData,
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
    } else {
      // 기본값 사용
      scheduleData = {
        ...scheduleData,
        duration: DEFAULT_CAR_DURATION_MINUTES,
        transportRoute: {
          totalTime: DEFAULT_CAR_DURATION_MINUTES * 60,
          totalDistance: 0,
          totalWalkTime: 0,
          totalWalkDistance: 0,
          transferCount: 0,
          leg: [],
          fare: { taxi: undefined },
        },
      };
    }
  }
  // 도보 경로
  else if (transportType === "WALK") {
    if (walkRouteSummary) {
      const walkDurationMinutes = Math.ceil(walkRouteSummary.totalTime / 60);
      scheduleData = {
        ...scheduleData,
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
    } else {
      // 기본값 사용
      scheduleData = {
        ...scheduleData,
        duration: DEFAULT_WALK_DURATION_MINUTES,
        transportRoute: {
          totalTime: DEFAULT_WALK_DURATION_MINUTES * 60,
          totalDistance: 0,
          totalWalkTime: DEFAULT_WALK_DURATION_MINUTES * 60,
          totalWalkDistance: 0,
          transferCount: 0,
          leg: [],
          fare: { taxi: undefined },
        },
      };
    }
  }

  return scheduleData;
}

// 시간 계산 헬퍼
export function addMinutesToTime(timeStr: string, minutes: number): string {
  const [hours, mins] = timeStr.split(":").map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
}

// 스케줄 종료 시간 계산
export function getScheduleEndTime(schedule: ScheduleDetail): string {
  return addMinutesToTime(schedule.startAt.substring(0, 5), schedule.duration);
}
