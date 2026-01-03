"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CarFrontIcon, MapPinIcon, PlayIcon, UtensilsIcon } from "lucide-react";
import SearchPlaces from "../sidebar/SearchPlaces";
import { ScheduleDetail } from "@/types/planner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updatePlanSchedule } from "@/lib/api/planner/schedule.client";
import { toMinutePrecision } from "@/utils/helpers/formatters";

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: ScheduleDetail;
  planId: string;
}

// 표시용: 분(minutes)을 더해서 종료 시간 문자열(HH:mm) 반환
const addMinutesToTime = (time: string, minutes: number) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const date = new Date(0, 0, 0, h, m + minutes);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
    2,
    "0"
  )}`;
};

export default function EditScheduleDialog({
  open,
  onOpenChange,
  schedule,
  planId,
}: EditScheduleDialogProps) {
  const router = useRouter();

  const [startTime, setStartTime] = useState(toMinutePrecision(schedule.startAt));
  const [duration, setDuration] = useState(schedule.duration); // 일정 소요 시간(분)
  const [details, setDetails] = useState(schedule.details); // 일정 메모

  // useEffect(() => {
  //   if (open) {
  //     setStartTime(schedule.startAt);
  //     setDuration(schedule.duration);
  //   }
  // }, [open, schedule]);

  const computedEndTime = useMemo(() => {
    // 필요 없다면 이 변수/표시 자체를 제거해도 됩니다.
    return addMinutesToTime(startTime, duration);
  }, [startTime, duration]);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    setDuration(Number.isFinite(next) ? Math.max(0, next) : 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedStartAt = startTime ? `${startTime}:00` : "";

    const updatedData = {
      ...schedule,
      startAt: normalizedStartAt,
      duration,
      details,
    };
    const result = await updatePlanSchedule({
      planId: String(planId),
      scheduleId: String(schedule.id),
      updatedData,
    });

    if (!result) {
      toast.error("일정 수정에 실패했습니다.");
      return;
    }
    toast.success("일정이 성공적으로 수정되었습니다.");
    router.refresh(); // 데이터 갱신
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {schedule.isMainEvent ? "공연 시간 상세 설정" : "일정 항목 수정"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
            {schedule.isMainEvent ? (
              <div className="bg-muted/50 rounded-lg border p-4">
                <h4 className="text-lg font-bold">{schedule.title}</h4>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPinIcon className="size-3" />
                  {schedule.concertPlaceName}
                </p>
              </div>
            ) : (
              <>
                <Field>
                  <FieldLabel>일정 타입</FieldLabel>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    defaultValue={schedule.scheduleType}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="ACTIVITY">
                      <PlayIcon className="mr-2 size-4" /> 활동
                    </ToggleGroupItem>
                    <ToggleGroupItem value="TRANSPORT">
                      <CarFrontIcon className="mr-2 size-4" /> 이동
                    </ToggleGroupItem>
                    <ToggleGroupItem value="MEAL">
                      <UtensilsIcon className="mr-2 size-4" /> 식사
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Field>

                <Field>
                  <Label htmlFor="edit-title">제목</Label>
                  <Input id="edit-title" defaultValue={schedule.title} />
                </Field>
              </>
            )}

            {/* 시간 설정: 시작시간 + 소요시간만 입력 */}
            <div className="bg-muted/30 space-y-3 rounded-lg border p-4">
              <Label className="block font-bold">시간 설정</Label>

              <div className="flex items-end gap-3">
                <div className="flex-1 space-y-1.5">
                  <Label htmlFor="startTime" className="text-muted-foreground text-xs">
                    시작
                  </Label>
                  <Input
                    type="time"
                    id="startTime"
                    step="60"
                    value={startTime}
                    onChange={handleStartTimeChange}
                  />
                </div>

                <div className="flex-1 space-y-1.5">
                  <Label htmlFor="duration" className="text-muted-foreground text-xs">
                    소요 시간(분)
                  </Label>
                  <Input
                    type="text"
                    id="duration"
                    value={duration}
                    onChange={handleDurationChange}
                  />
                </div>
              </div>

              {/* 선택: 종료 예상 시간 표시(입력은 안 받음) */}
              {computedEndTime && (
                <p className="text-muted-foreground text-sm">종료 예상 시간: {computedEndTime}</p>
              )}
            </div>

            {!schedule.isMainEvent && (
              <Field>
                <Label>장소</Label>
                <SearchPlaces defaultValue={schedule.location} />
              </Field>
            )}

            <Field>
              <Label>메모</Label>
              <Textarea
                className="h-24 resize-none"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={
                  schedule.isMainEvent
                    ? "공연 관람 팁이나 준비물을 기록하세요."
                    : "일정 메모를 입력하세요."
                }
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">{schedule.isMainEvent ? "시간 적용" : "수정 완료"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
