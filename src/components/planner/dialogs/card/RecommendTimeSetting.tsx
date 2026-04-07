import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { UseFormReturn } from "react-hook-form";

interface RecommendTimeSettingProps {
  form: UseFormReturn<ScheduleFormData>;
  transportType: string;
  onTransportTypeChange: (v: string) => void;
  bufferMinutes: number;
  onBufferChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RecommendTimeSetting({
  form,
  transportType,
  onTransportTypeChange,
  bufferMinutes,
  onBufferChange,
}: RecommendTimeSettingProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="transportType"
        render={() => (
          <FormItem>
            <FormLabel>이동 수단</FormLabel>
            <FormControl>
              <Select value={transportType} onValueChange={onTransportTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="이동수단을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transit">대중교통</SelectItem>
                  <SelectItem value="car">택시</SelectItem>
                  <SelectItem value="walk">도보</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bufferMinutes"
        render={() => (
          <FormItem>
            <FormLabel htmlFor="buffer-input">여유 시간 (분)</FormLabel>
            <Input
              id="buffer-input"
              type="number"
              min={0}
              max={60}
              value={bufferMinutes}
              onChange={onBufferChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
