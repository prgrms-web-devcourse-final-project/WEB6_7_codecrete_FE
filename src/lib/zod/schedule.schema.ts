import { z } from "zod";
import type { Itinerary, KakaoMapSummary, TMapWalkRoute } from "@/types/planner";

// MEAL 스케줄
const mealSchema = z
  .object({
    scheduleType: z.literal("MEAL"),
    title: z.string().min(1, "일정 이름을 입력해주세요"),
    startAt: z.string().min(1, "시작 시간을 선택해주세요"),
    duration: z.number().min(1, "소요 시간을 선택해주세요"),
    details: z.string().trim().min(1, "상세 정보를 입력해주세요"),
    estimatedCost: z.number().nonnegative(),
    placeName: z.string(),
    placeAddress: z.string(),
    coords: z
      .object({
        lat: z.number(),
        lon: z.number(),
      })
      .nullable(),
    selectedRegularScheduleId: z.string().optional(),
  })
  .refine((data) => data.coords !== null || data.selectedRegularScheduleId, {
    message: "장소를 선택하거나 기존 일정을 선택해주세요",
    path: ["coords"],
  });

// WAITING 스케줄
const waitingSchema = z
  .object({
    scheduleType: z.literal("WAITING"),
    title: z.string().min(1, "일정 이름을 입력해주세요"),
    startAt: z.string().min(1, "시작 시간을 선택해주세요"),
    duration: z.number().min(1, "소요 시간을 선택해주세요"),
    details: z.string().trim().min(1, "상세 정보를 입력해주세요"),
    estimatedCost: z.number().nonnegative(),
    placeName: z.string(),
    placeAddress: z.string(),
    coords: z
      .object({
        lat: z.number(),
        lon: z.number(),
      })
      .nullable(),
    selectedRegularScheduleId: z.string().optional(),
  })
  .refine((data) => data.coords !== null || data.selectedRegularScheduleId, {
    message: "장소를 선택하거나 기존 일정을 선택해주세요",
    path: ["coords"],
  });

// ACTIVITY 스케줄
const activitySchema = z.object({
  scheduleType: z.literal("ACTIVITY"),
  title: z.string().min(1, "일정 이름을 입력해주세요"),
  startAt: z.string().min(1, "시작 시간을 선택해주세요"),
  duration: z.number().min(1, "소요 시간을 선택해주세요"),
  details: z.string().trim().min(1, "상세 정보를 입력해주세요"),
  estimatedCost: z.number().nonnegative(),
  placeName: z.string(),
  placeAddress: z.string(),
  coords: z
    .object({
      lat: z.number(),
      lon: z.number(),
    })
    .nullable(),
  selectedRegularScheduleId: z.string().optional(),
});

// OTHER 스케줄
const otherSchema = z.object({
  scheduleType: z.literal("OTHER"),
  title: z.string().min(1, "일정 이름을 입력해주세요"),
  startAt: z.string().min(1, "시작 시간을 선택해주세요"),
  duration: z.number().min(1, "소요 시간을 선택해주세요"),
  details: z.string().trim().min(1, "상세 정보를 입력해주세요"),
  estimatedCost: z.number().nonnegative(),
  placeName: z.string(),
  placeAddress: z.string(),
  coords: z
    .object({
      lat: z.number(),
      lon: z.number(),
    })
    .nullable(),
  selectedRegularScheduleId: z.string().optional(),
});

// TRANSPORT 스케줄
const transportSchema = z
  .object({
    scheduleType: z.literal("TRANSPORT"),
    title: z.string().min(1, "일정 이름을 입력해주세요"),
    startAt: z.string(),
    duration: z.number().nonnegative(),
    details: z.string().trim().min(1, "상세 정보를 입력해주세요"),
    estimatedCost: z.number().nonnegative(),
    startScheduleId: z.string().min(1, "출발 일정을 선택해주세요"),
    endScheduleId: z.string().min(1, "도착 일정을 선택해주세요"),
    transportType: z.enum(["WALK", "PUBLIC_TRANSPORT", "CAR"]),
    selectedRouteIndex: z.number().nullable().optional(),
    routeData: z.custom<Itinerary[]>((val) => Array.isArray(val)).optional(),
    carRouteSummary: z
      .custom<KakaoMapSummary>((val) => typeof val === "object" && val !== null)
      .nullable()
      .optional(),
    walkRouteSummary: z
      .custom<TMapWalkRoute>((val) => typeof val === "object" && val !== null)
      .nullable()
      .optional(),
  })
  .refine((data) => data.startScheduleId !== data.endScheduleId, {
    message: "출발지와 도착지가 같을 수 없습니다",
    path: ["endScheduleId"],
  });

// Discriminated Union 스키마
export const scheduleFormSchema = z.discriminatedUnion("scheduleType", [
  mealSchema,
  waitingSchema,
  activitySchema,
  otherSchema,
  transportSchema,
]);

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
// 기본값 생성 헬퍼
export const getDefaultScheduleValues = (
  type: "MEAL" | "WAITING" | "ACTIVITY" | "TRANSPORT" | "OTHER" = "MEAL",
  defaultStartTime?: string
): ScheduleFormData => {
  if (type === "TRANSPORT") {
    return {
      scheduleType: "TRANSPORT",
      title: "",
      startAt: "",
      duration: 0,
      details: "",
      estimatedCost: 0,
      startScheduleId: "",
      endScheduleId: "",
      transportType: "PUBLIC_TRANSPORT",
      selectedRouteIndex: null,
      routeData: [],
    };
  }

  return {
    scheduleType: type,
    title: "",
    startAt: defaultStartTime || "12:00",
    duration: 60,
    details: "",
    estimatedCost: 0,
    placeName: "",
    placeAddress: "",
    coords: null,
    selectedRegularScheduleId: undefined,
  };
};
