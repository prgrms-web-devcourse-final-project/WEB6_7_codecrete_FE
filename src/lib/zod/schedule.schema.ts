import { ScheduleType } from "@/types/planner";
import {
  DEFAULT_CAFE_DURATION,
  DEFAULT_MEAL_DURATION,
  DEFAULT_OTHER_DURATION,
} from "@/constants/planner";
import { z } from "zod";

const uiFields = {
  selectedRegularScheduleId: z.string().optional(),
  transportType: z.enum(["transit", "car", "walk"]).default("transit").optional(),
  bufferMinutes: z
    .number()
    .min(0, "여유 시간은 0분 이상이어야 합니다")
    .max(60, "여유 시간은 60분 이하여야 합니다")
    .default(10)
    .optional(),
};

// 공통 스케줄 필드
const baseScheduleFields = {
  title: z.string().min(1, "일정 이름을 입력해주세요"),
  startAt: z.string().min(1, "시작 시간을 선택해주세요"),
  duration: z.number().min(1, "소요 시간을 선택해주세요"),
  details: z.string().trim().min(1, "상세 정보를 입력해주세요"),
  estimatedCost: z.number().nonnegative(),
  placeName: z.string(),
  placeAddress: z.string(),
  coords: z.object({ lat: z.number(), lon: z.number() }).nullable(),
};

// MEAL 스케줄
const mealSchema = z
  .object({
    scheduleType: z.literal("MEAL"),
    ...baseScheduleFields,
    ...uiFields,
  })
  .refine((data) => data.coords !== null || data.selectedRegularScheduleId, {
    message: "장소를 선택하거나 기존 일정을 선택해주세요",
    path: ["coords"],
  });

// WAITING 스케줄
const waitingSchema = z
  .object({
    scheduleType: z.literal("WAITING"),
    ...baseScheduleFields,
    ...uiFields,
  })
  .refine((data) => data.coords !== null || data.selectedRegularScheduleId, {
    message: "장소를 선택하거나 기존 일정을 선택해주세요",
    path: ["coords"],
  });

// ACTIVITY 스케줄
const activitySchema = z.object({
  scheduleType: z.literal("ACTIVITY"),
  ...baseScheduleFields,
  ...uiFields,
});

// OTHER 스케줄
const otherSchema = z.object({
  scheduleType: z.literal("OTHER"),
  ...baseScheduleFields,
  ...uiFields,
});

export const scheduleFormSchema = z.discriminatedUnion("scheduleType", [
  mealSchema,
  waitingSchema,
  activitySchema,
  otherSchema,
]);

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;

export const getDefaultScheduleValues = (
  type: Exclude<ScheduleType, "TRANSPORT">,
  defaultStartTime?: string
): ScheduleFormData => {
  let duration: number;
  if (type === "MEAL") {
    duration = DEFAULT_MEAL_DURATION;
  } else if (type === "WAITING") {
    duration = DEFAULT_CAFE_DURATION;
  } else {
    duration = DEFAULT_OTHER_DURATION;
  }

  return {
    scheduleType: type,
    title: "",
    startAt: defaultStartTime || "12:00",
    duration: duration,
    details: "",
    estimatedCost: 0,
    placeName: "",
    placeAddress: "",
    coords: null,
    selectedRegularScheduleId: undefined,
    transportType: "transit",
    bufferMinutes: 10,
  };
};
