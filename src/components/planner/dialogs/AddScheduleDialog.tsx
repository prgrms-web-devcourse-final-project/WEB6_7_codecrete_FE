"use client";
import { useMemo, useTransition } from "react";
import { useWatch, type FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

import { PlaceSelector } from "./fields/PlaceSelector";
import { createPlanSchedule } from "@/lib/api/planner/schedule.client";
import { type ScheduleFormData } from "@/lib/zod/schedule.schema";
import { transformBasicSchedule } from "@/utils/helpers/scheduleTransform";
import { ConcertCoords, ScheduleDetail } from "@/types/planner";
import { TimeValidationResult, validateScheduleTime } from "@/utils/helpers/scheduleValidation";
import ScheduleTypeField from "./fields/ScheduleTypeField";
import { useAddScheduleForm } from "@/hooks/planner/useAddScheduleForm";
import { useRecommendedTime } from "@/hooks/planner/useRecommendedTime";
import PreviousScheduleSelector from "./fields/PreviousScheduleSelector";
import ScheduleTimeSection from "./fields/ScheduleTimeSection";
import { useWarningTime } from "@/hooks/planner/useWarningTime";
import { WarningTimeDialog } from "./WarningTimeDialog";
import ScheduleDetailField from "./fields/ScheduleDetailField";
import ScheduleTitleField from "./fields/ScheduleTitleField";

interface AddScheduleDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultStartTime?: string;
  defaultCoords?: ConcertCoords;
  schedules?: ScheduleDetail[];
}

export default function AddScheduleDialog({
  planId,
  open,
  onOpenChange,
  defaultStartTime,
  defaultCoords,
  schedules = [],
}: AddScheduleDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { form, currentScheduleType, resetToInitialState, handleScheduleTypeChange } =
    useAddScheduleForm(defaultStartTime);

  // 일반 일정 선택지
  const regularScheduleCandidates = useMemo(
    () => schedules.filter((s) => s.id && s.scheduleType !== "TRANSPORT" && s.location),
    [schedules]
  );

  // watch
  const selectedScheduleId = useWatch({ control: form.control, name: "selectedRegularScheduleId" });
  const currentCoords = useWatch({ control: form.control, name: "coords" });
  const startAt = useWatch({ control: form.control, name: "startAt" });
  const userTransportType = useWatch({ control: form.control, name: "transportType" }); // 탭 연동
  const bufferMinutes = useWatch({ control: form.control, name: "bufferMinutes" }) ?? 10;

  const { recommendedTimes, isLoading } = useRecommendedTime({
    selectedScheduleId,
    currentCoords,
    regularScheduleCandidates,
    bufferMinutes,
  });

  const activeRecommend =
    recommendedTimes && userTransportType ? recommendedTimes[userTransportType] : null;

  // 시간 변경 시 검증
  const timeValidation: TimeValidationResult = useMemo(() => {
    if (!startAt || !selectedScheduleId || !activeRecommend) {
      return { isValid: true, type: "valid" };
    }

    const selectedSchedule = regularScheduleCandidates.find(
      (s) => String(s.id) === selectedScheduleId
    );

    if (!selectedSchedule) {
      return { isValid: true, type: "valid" };
    }

    // 이전 일정과의 시간 검증
    const travelMinutes = Math.ceil(activeRecommend.duration / 60);
    return validateScheduleTime(selectedSchedule, startAt, travelMinutes, bufferMinutes);
  }, [startAt, selectedScheduleId, activeRecommend, regularScheduleCandidates, bufferMinutes]);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) resetToInitialState();
    onOpenChange(newOpen);
  };

  // 실제 일정 제출 함수
  const submitSchedule = async (data: ScheduleFormData) => {
    startTransition(async () => {
      try {
        const scheduleData = transformBasicSchedule(data);
        await createPlanSchedule({
          planId,
          scheduleData,
        });

        toast.success("일정이 성공적으로 생성되었습니다.");
        handleOpenChange(false);
        router.refresh();
      } catch (error) {
        console.error("Submit error:", error);
        const errorMessage = error instanceof Error ? error.message : "일정 생성에 실패했습니다.";
        toast.error(errorMessage);
      }
    });
  };

  const {
    showWarning,
    trigger: triggerWarning,
    confirm: confirmWarning,
    cancel: cancelWarning,
  } = useWarningTime(submitSchedule);

  const onSubmit = async (data: ScheduleFormData) => {
    // 시간 검증 실패시 경고 다이얼로그 표시
    if (!timeValidation.isValid) {
      triggerWarning(data);
      return;
    }
    await submitSchedule(data);
  };

  // 폼 검증 실패 시 호출
  const onError = (errors: FieldErrors<ScheduleFormData>) => {
    const type = form.getValues("scheduleType");
    if ((type === "MEAL" || type === "WAITING") && "coords" in errors) {
      toast.error("장소를 선택해주세요");
    } else if ((type === "ACTIVITY" || type === "OTHER") && "title" in errors) {
      toast.error("일정 이름을 입력해주세요");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] w-[95%] max-w-lg overflow-hidden">
          <DialogHeader>
            <DialogTitle>새로운 일정 추가</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="max-h-[60vh] space-y-4 overflow-y-auto p-4">
                {/* 일정 타입 선택 */}
                <ScheduleTypeField form={form} onTypeChange={handleScheduleTypeChange} />
                {/* 일정 선택 (기존 일정 연결) */}
                {regularScheduleCandidates.length > 0 && (
                  <PreviousScheduleSelector form={form} candidates={regularScheduleCandidates} />
                )}
                {/* 장소 선택 */}
                <PlaceSelector
                  key={currentScheduleType}
                  form={form}
                  scheduleType={currentScheduleType}
                  defaultCoords={defaultCoords}
                />
                {/* 일정 제목 */}
                <ScheduleTitleField form={form} />
                {/* 일정 시간 */}
                <ScheduleTimeSection
                  form={form}
                  recommendResult={activeRecommend}
                  isLoading={isLoading}
                  timeValidation={timeValidation}
                  startAt={form.getValues("startAt")}
                />
                {/* 상세 정보 */}
                <ScheduleDetailField form={form} />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost" type="button" disabled={isPending}>
                    취소
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      등록 중...
                    </>
                  ) : (
                    "일정 등록"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* 시간 경고 AlertDialog */}
      <WarningTimeDialog open={showWarning} onConfirm={confirmWarning} onCancel={cancelWarning} />
    </>
  );
}
