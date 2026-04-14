import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ActiveScheduleType } from "@/hooks/planner/useAddScheduleForm";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { UtensilsIcon, CoffeeIcon, NotepadTextIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTypeProps {
  form: UseFormReturn<ScheduleFormData>;
  onTypeChange: (type: ActiveScheduleType) => void;
}

export default function ScheduleTypeField({ form, onTypeChange }: ScheduleTypeProps) {
  return (
    <FormField
      control={form.control}
      name="scheduleType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            어떤 일정인가요?<span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <ToggleGroup
              type="single"
              variant="outline"
              value={field.value}
              onValueChange={(val) => {
                if (val) {
                  field.onChange(val);
                  onTypeChange(val as ActiveScheduleType);
                }
              }}
              className="w-full"
            >
              <ToggleGroupItem value="MEAL" className="flex-1 gap-2">
                <UtensilsIcon className="size-4" />
                <span>식사</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="WAITING" className="flex-1 gap-2">
                <CoffeeIcon className="size-4" />
                <span>카페</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="ACTIVITY" className="flex-1 gap-2">
                <NotepadTextIcon className="size-4" />
                <span>기타</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
