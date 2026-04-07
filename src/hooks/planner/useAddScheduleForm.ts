import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  scheduleFormSchema,
  type ScheduleFormData,
  getDefaultScheduleValues,
} from "@/lib/zod/schedule.schema";
import { toMinutePrecision } from "@/utils/helpers/formatters";
import { ScheduleType } from "@/types/planner";

export type ActiveScheduleType = Exclude<ScheduleType, "TRANSPORT">;

export function useAddScheduleForm(defaultStartTime?: string) {
  const [currentScheduleType, setCurrentScheduleType] = useState<ActiveScheduleType>("MEAL");

  // React Hook Form 초기화
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: getDefaultScheduleValues("MEAL", toMinutePrecision(defaultStartTime)),
    mode: "onSubmit", // 첫 제출 시에만 검증
    reValidateMode: "onChange", // 제출 후에는 입력할 때마다 재검증 (에러 즉시 제거)
    criteriaMode: "all",
    shouldFocusError: false,
  });

  // 초기화 로직
  const resetToInitialState = () => {
    setCurrentScheduleType("MEAL");
    const initialValues = getDefaultScheduleValues("MEAL", toMinutePrecision(defaultStartTime));
    form.reset(initialValues, {
      keepDirty: false,
      keepTouched: false,
      keepIsValid: false,
      keepErrors: false,
    });
  };

  // scheduleType 변경 핸들러
  const handleScheduleTypeChange = (newType: Exclude<ScheduleType, "TRANSPORT">) => {
    setCurrentScheduleType(newType);
    const newValues = getDefaultScheduleValues(newType, toMinutePrecision(defaultStartTime));
    form.reset(newValues, {
      keepDirty: false,
      keepTouched: false,
      keepIsValid: false,
      keepErrors: false,
    });
  };

  return {
    form,
    currentScheduleType,
    resetToInitialState,
    handleScheduleTypeChange,
  };
}
