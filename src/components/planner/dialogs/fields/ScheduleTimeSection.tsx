import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import RecommendTimeCard from "../card/RecommendTimeCard";
import { RecommendedTimes } from "@/hooks/planner/useRecommendedTime";
import { TimeValidationResult } from "@/utils/helpers/scheduleValidation";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import RecommendTimeSetting from "../card/RecommendTimeSetting";
import { useRecommendTransport } from "@/hooks/planner/useRecommendTransport";

interface ScheduleTimeSectionProps {
  form: UseFormReturn<ScheduleFormData>;
  recommendResult?: RecommendedTimes | null;
  isLoading: boolean;
  timeValidation: TimeValidationResult;
  startAt: string;
}

/**
 * 시작 시간 + 소요시간 + 추천 시간 카드를 묶어서 렌더링합니다.
 */
export default function ScheduleTimeSection({
  form,
  recommendResult,
  isLoading,
  timeValidation,
  startAt,
}: ScheduleTimeSectionProps) {
  const { bufferMinutes, transportType, handleTransportTypeChange, handleBufferChange } =
    useRecommendTransport({ form });

  const applyRecommendedTime = () => {
    if (!recommendResult?.startAt) return;
    form.setValue("startAt", recommendResult.startAt, { shouldValidate: true });
    toast.success("추천 시간이 적용되었습니다");
  };

  return (
    <>
      <div className="flex gap-4">
        {/* 시작 시간 */}
        <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                시작 시간<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="time" step="60" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 소요시간 */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                소요시간<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  value={String(field.value)}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30분</SelectItem>
                    <SelectItem value="60">1시간</SelectItem>
                    <SelectItem value="90">1시간 30분</SelectItem>
                    <SelectItem value="120">2시간</SelectItem>
                    <SelectItem value="150">2시간 30분</SelectItem>
                    <SelectItem value="180">3시간</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* 추천 시간 카드 */}
      {recommendResult &&
        (isLoading ? (
          <Card className="border-amber-600/20 bg-amber-600/5 p-4">
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-amber-600" />
              <p className="text-sm font-medium">이동 시간 기반 추천을 불러오는 중...</p>
            </div>
          </Card>
        ) : (
          <>
            <RecommendTimeSetting
              form={form}
              transportType={transportType}
              onTransportTypeChange={handleTransportTypeChange}
              bufferMinutes={bufferMinutes}
              onBufferChange={handleBufferChange}
            />
            <RecommendTimeCard
              travelDuration={recommendResult?.duration}
              recommendedStartTime={recommendResult?.startAt}
              currentStartTime={startAt}
              validation={timeValidation}
              onApply={applyRecommendedTime}
            />
          </>
        ))}
    </>
  );
}
