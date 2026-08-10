import { TransportMode } from "./useRecommendedTime";
import { UseFormReturn, useWatch } from "react-hook-form";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";

interface UseTransportRecommendOptions {
  form: UseFormReturn<ScheduleFormData>;
  hasTransitRoutes?: boolean;
}

export function useRecommendTransport({ form }: UseTransportRecommendOptions) {
  const watchedTransportType = useWatch({ control: form.control, name: "transportType" });
  const watchedBufferMinutes = useWatch({ control: form.control, name: "bufferMinutes" });

  const transportType: TransportMode = watchedTransportType ?? "transit";
  const bufferMinutes = watchedBufferMinutes ?? 10;

  const handleTransportTypeChange = (value: string) => {
    const valid: TransportMode[] = ["transit", "car", "walk"];
    if (valid.includes(value as TransportMode)) {
      form.setValue("transportType", value as TransportMode, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const handleBufferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (isNaN(raw)) {
      form.setValue("bufferMinutes", 0, {
        shouldDirty: true,
        shouldValidate: true,
      });
      return;
    }

    form.setValue("bufferMinutes", Math.min(60, Math.max(0, raw)), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return {
    bufferMinutes,
    transportType,
    handleTransportTypeChange,
    handleBufferChange,
  };
}
