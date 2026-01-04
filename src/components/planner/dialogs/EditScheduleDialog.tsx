"use client";

import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon, Loader2, ClockIcon, InfoIcon } from "lucide-react";
import { ScheduleDetail } from "@/types/planner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updatePlanSchedule } from "@/lib/api/planner/schedule.client";
import { formatTimeToKoreanAMPM } from "@/utils/helpers/formatters";

interface EditScheduleDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: ScheduleDetail;
}

export default function EditScheduleDialog({
  planId,
  open,
  onOpenChange,
  schedule,
}: EditScheduleDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("scheduleTitle") as string;
    const notes = formData.get("scheduleNotes") as string;

    // 제목과 메모만 업데이트
    const scheduleData = {
      ...schedule,
      title,
      details: notes,
    };

    startTransition(async () => {
      try {
        await updatePlanSchedule({
          planId,
          scheduleId: String(schedule.id),
          updatedData: scheduleData,
        });
        toast.success("일정이 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("Error updating schedule:", error);
        toast.error("일정 수정에 실패했습니다. 다시 시도해주세요.");
      } finally {
        router.refresh();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{schedule.isMainEvent ? "공연 정보" : "일정 수정"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup className="max-h-[60vh] gap-4 overflow-y-auto p-4">
            {/* 메인 이벤트(공연)는 읽기 전용 */}
            {schedule.isMainEvent && (
              <div className="bg-muted/50 rounded-lg border p-4">
                <h4 className="text-lg font-bold">{schedule.title}</h4>
                <div className="text-muted-foreground mt-2 space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <MapPinIcon className="size-4" />
                    {schedule.concertPlaceName}
                  </p>
                  <p className="flex items-center gap-2">
                    <ClockIcon className="size-4" />
                    {formatTimeToKoreanAMPM(schedule.startAt)}
                  </p>
                </div>
              </div>
            )}

            {/* 일반 일정 정보 표시 */}
            {!schedule.isMainEvent && (
              <>
                {/* 읽기 전용 정보 */}
                <div className="bg-bg-sub space-y-4 rounded-md border p-4">
                  {/* 상단: 주요 정보 (장소 & 시간) */}
                  <div className="grid gap-4">
                    {schedule.location && (
                      <div className="flex flex-col gap-1">
                        <div className="text-muted-foreground flex items-center gap-1 text-xs leading-normal font-medium">
                          <MapPinIcon className="size-3" />
                          장소
                        </div>
                        <p className="text-sm font-medium">{schedule.location}</p>
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <div className="text-muted-foreground flex items-center gap-1 text-xs leading-normal font-medium">
                        <ClockIcon className="size-3" />
                        시간
                      </div>
                      <p className="text-sm font-medium">
                        {formatTimeToKoreanAMPM(schedule.startAt)}
                        <span className="text-muted-foreground ml-1 font-normal">
                          ({schedule.duration}분)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* 하단: 안내 메시지 (Alert 스타일) */}
                  <div className="bg-muted text-muted-foreground border-border flex items-start gap-2 rounded-sm border px-3 py-2.5 text-xs">
                    <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span className="leading-normal">
                      장소와 시간을 변경하려면 일정을 삭제 후 다시 추가해야 합니다.
                    </span>
                  </div>
                </div>

                {/* 일정 제목 */}
                <Field>
                  <Label htmlFor="scheduleTitle">일정 이름</Label>
                  <Input
                    id="scheduleTitle"
                    name="scheduleTitle"
                    placeholder="예: 점심 식사, 굿즈 구매"
                    defaultValue={schedule.title}
                  />
                </Field>

                {/* 메모 */}
                <Field>
                  <Label htmlFor="scheduleNotes">상세 정보</Label>
                  <Textarea
                    id="scheduleNotes"
                    name="scheduleNotes"
                    placeholder="메모를 입력하세요"
                    className="h-24 resize-none"
                    defaultValue={schedule.details}
                  />
                </Field>
              </>
            )}
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isPending}>
                취소
              </Button>
            </DialogClose>
            {!schedule.isMainEvent && (
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    수정 중...
                  </>
                ) : (
                  "수정 완료"
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
