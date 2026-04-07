import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { UseFormReturn } from "react-hook-form";

interface ScheduleDetailFieldProps {
  form: UseFormReturn<ScheduleFormData>;
}

export default function ScheduleDetailField({ form }: ScheduleDetailFieldProps) {
  return (
    <FormField
      control={form.control}
      name="details"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            상세 정보<span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Textarea {...field} placeholder="메모를 입력하세요" className="h-20 resize-none" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
