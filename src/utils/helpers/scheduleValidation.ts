// src/utils/helpers/scheduleValidation.ts

import type { ScheduleDetail } from "@/types/planner";

export type TimeValidationResult = {
  isValid: boolean;
  type: "insufficient" | "overlap" | "valid";
  message?: string;
  requiredTime?: number;
  actualTime?: number;
  recommendedStartTime?: string;
};

function normalizeTime(time: string): string {
  if (time.includes("T")) {
    return time.split("T")[1].substring(0, 5);
  }
  return time.substring(0, 5);
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function validateScheduleTime(
  prevSchedule: ScheduleDetail | null,
  newStartTime: string,
  travelTimeMinutes: number = 0
): TimeValidationResult {
  if (!prevSchedule) {
    return { isValid: true, type: "valid" };
  }

  const prevStartTime = normalizeTime(prevSchedule.startAt);
  const prevStartMinutes = timeToMinutes(prevStartTime);
  const prevEndMinutes = prevStartMinutes + prevSchedule.duration;
  const newStartMinutes = timeToMinutes(normalizeTime(newStartTime));
  const actualMinutes = newStartMinutes - prevEndMinutes;

  const bufferMinutes = 10;
  const requiredMinutes = travelTimeMinutes + bufferMinutes;

  // 1. 이전 일정과 겹치는지 체크 - 이동시간 포함해서 추천
  if (actualMinutes <= 0) {
    return {
      isValid: false,
      type: "overlap",
      message: "이전 일정과 겹칩니다.",
      recommendedStartTime: minutesToTime(prevEndMinutes + requiredMinutes),
    };
  }

  // 2. 이동 시간이 부족한지 체크
  if (actualMinutes < requiredMinutes) {
    return {
      isValid: false,
      type: "insufficient",
      message: "이동 시간이 부족해요!",
      requiredTime: travelTimeMinutes,
      actualTime: actualMinutes,
      recommendedStartTime: minutesToTime(prevEndMinutes + requiredMinutes),
    };
  }

  return {
    isValid: true,
    type: "valid",
  };
}

export function calculateBufferTime(
  prevSchedule: ScheduleDetail | null,
  newStartTime: string,
  travelTimeMinutes: number
): number | null {
  if (!prevSchedule) return null;

  const prevStartTime = normalizeTime(prevSchedule.startAt);
  const prevStartMinutes = timeToMinutes(prevStartTime);
  const prevEndMinutes = prevStartMinutes + prevSchedule.duration;
  const newStartMinutes = timeToMinutes(normalizeTime(newStartTime));
  const actualMinutes = newStartMinutes - prevEndMinutes;

  return actualMinutes - travelTimeMinutes;
}
