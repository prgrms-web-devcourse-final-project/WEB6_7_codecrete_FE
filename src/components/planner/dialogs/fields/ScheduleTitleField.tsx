import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTitleFieldProps {
  form: UseFormReturn<ScheduleFormData>;
}

export default function ScheduleTitleField({ form }: ScheduleTitleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            일정 이름<span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input {...field} placeholder="예: 점심 식사, 굿즈 구매" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
