import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { useState } from "react";

export function useWarningTime(onConfirm: (formData: ScheduleFormData) => Promise<void>) {
  const [showWarning, setShowWarning] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<ScheduleFormData | null>(null);

  const trigger = (formData: ScheduleFormData) => {
    setPendingFormData(formData);
    setShowWarning(true);
  };

  const confirm = async () => {
    setShowWarning(false);
    if (pendingFormData) {
      await onConfirm(pendingFormData);
      setPendingFormData(null);
    }
  };

  const cancel = () => {
    setShowWarning(false);
    setPendingFormData(null);
  };

  return {
    showWarning,
    trigger,
    confirm,
    cancel,
  };
}
