import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { ScheduleDetail } from "@/types/planner";
import { formatTimeToKoreanAMPM } from "@/utils/helpers/formatters";
import { getScheduleEndTime } from "@/utils/helpers/scheduleTransform";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface PreviousScheduleSelectorProps {
  form: UseFormReturn<ScheduleFormData>;
  candidates: ScheduleDetail[];
}

export default function PreviousScheduleSelector({
  form,
  candidates,
}: PreviousScheduleSelectorProps) {
  // 이전 일정을 직접 선택할 경우 기본 시작 시간 자동으로 설정
  const handleChange = (
    value: string,
    field: ControllerRenderProps<ScheduleFormData, "selectedRegularScheduleId">,
    form: UseFormReturn<ScheduleFormData>
  ) => {
    if (value === "new") {
      field.onChange(undefined);
    } else {
      field.onChange(value);
      const selected = candidates.find((s) => String(s.id) === value);
      if (selected) {
        const endTime = getScheduleEndTime(selected);
        form.setValue("startAt", endTime, { shouldValidate: false });
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name="selectedRegularScheduleId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>일정 선택</FormLabel>
          <FormControl>
            <Select
              value={field.value || "new"}
              onValueChange={(value) => handleChange(value, field, form)}
            >
              <SelectTrigger className="w-(--radix-form-item-width) overflow-hidden *:data-[slot=select-value]:*:w-full">
                <SelectValue placeholder="이전 일정 이어서 시작" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">직접 시간 설정</SelectItem>
                {candidates.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.title} ({formatTimeToKoreanAMPM(item.startAt)}, {item.duration}
                    분)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
