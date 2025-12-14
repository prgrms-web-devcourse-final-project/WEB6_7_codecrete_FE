"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CarFrontIcon,
  MoreHorizontalIcon,
  PlayIcon,
  UtensilsIcon,
  Music,
  FootprintsIcon,
  TrainIcon,
  SparklesIcon,
  CalendarCheck,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SearchPlaces from "@/components/planner/SearchPlaces";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { twMerge } from "tailwind-merge";
import { ScheduleProps, ScheduleType, TransportType } from "@/types/planner";
import { Separator } from "@/components/ui/separator";

const getIcon = (type: ScheduleType, onLast: boolean, transport_type?: TransportType) => {
  switch (type) {
    case "TRANSPORT":
      if (transport_type === "WALK") {
        return <FootprintsIcon className="stroke-text-sub" />;
      }
      if (transport_type === "PUBLIC_TRANSPORT") {
        return <TrainIcon className="stroke-text-sub" />;
      }
      if (transport_type === "CAR") {
        return <CarFrontIcon className="stroke-text-sub" />;
      }
    case "MEAL":
      return <UtensilsIcon className="stroke-text-main" />;
    case "CONCERT":
      return <Music className="stroke-text-point-main" />;
    default:
      if (onLast) return <CalendarCheck className="stroke-text-sub" />;
      return <SparklesIcon className="fill-text-sub stroke-text-sub" />;
  }
};

export default function PlannerTimelineItem({
  schedule,
  onLast,
}: {
  schedule: ScheduleProps;
  onLast: boolean;
}) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEditDialog = () => {
    setShowEditDialog(true);
  };

  const handleDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const renderIcon = (type: ScheduleType, onLast: boolean, transport_type?: TransportType) => {
    return getIcon(type, onLast, transport_type);
  };

  return (
    <>
      <article className="flex gap-6">
        <div
          className={twMerge(
            "border-bg-main bg-bg-sub flex size-16 items-center justify-center rounded-full border-4",
            schedule.schedule_type === "CONCERT" &&
              "bg-point-main border-white shadow-md shadow-zinc-900/20",
            schedule.schedule_type === "MEAL" && "bg-bg-main border-point-main"
          )}
        >
          {renderIcon(schedule.schedule_type, onLast, schedule.transport_type)}
        </div>
        <div
          className={twMerge(
            "border-border bg-bg-sub flex-1 space-y-4 rounded-xl border p-6",
            schedule.schedule_type === "CONCERT" && "bg-point-main",
            schedule.schedule_type === "MEAL" && "border-border-point bg-bg-main border-2"
          )}
        >
          <div className="flex items-center justify-between">
            <h4
              className={twMerge(
                "text-lg font-bold",
                schedule.schedule_type === "CONCERT" ? "text-text-point-main" : "text-text-main"
              )}
            >
              {schedule.title}
            </h4>
            <div className="flex items-center gap-2">
              <span
                className={twMerge(
                  "font-medium whitespace-nowrap",
                  schedule.schedule_type === "CONCERT" ? "text-bg-main" : "text-text-sub"
                )}
              >
                {schedule.start_at}
              </span>
              {schedule.schedule_type !== "CONCERT" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" aria-label="메뉴 열기" className="size-8">
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={handleEditDialog}>수정</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleDeleteDialog}>삭제</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <div
            className={twMerge(
              "text-text-sub text-sm",
              schedule.schedule_type === "CONCERT" && "text-text-point-sub"
            )}
          >
            <p>{schedule.details}</p>
          </div>
          {schedule.schedule_type !== "CONCERT" && schedule.schedule_type !== "MEAL" && !onLast && (
            <>
              <Separator />
              <div className="text-text-sub grid grid-cols-2 gap-3 text-sm">
                {schedule.schedule_type === "TRANSPORT" && (
                  <>
                    {schedule.transport_type !== "WALK" && (
                      <div className="space-y-1">
                        <h5 className="text-xs font-medium">예상 금액</h5>
                        <p className="text-text-main text-sm font-semibold">
                          {schedule.estimated_cost}원
                        </p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <h5 className="text-xs font-medium">예상 시간</h5>
                      <p className="text-text-main text-sm font-semibold">{schedule.duration}분</p>
                    </div>
                    {schedule.transport_type === "PUBLIC_TRANSPORT" && (
                      <div className="space-y-1">
                        <h5 className="text-xs font-medium">이동 경로</h5>
                        <p className="text-text-main text-sm font-semibold">{schedule.location}</p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <h5 className="text-xs font-medium">이동 거리</h5>
                      <p className="text-text-main text-sm font-semibold">{schedule.distance}m</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </article>

      <Dialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        aria-description="일정 항목 수정"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>일정 항목 수정</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] overflow-y-auto p-4">
            <Field>
              <FieldLabel htmlFor="scheduleType">일정 타입</FieldLabel>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={2}
                className="*:border-border *:fill-text-sub *:text-text-sub *:data-[state=on]:bg-point-main *:data-[state=on]:[svg]:fill-point-sub *:data-[state=on]:text-point-sub"
              >
                <ToggleGroupItem value="ACTIVITY" aria-label="활동">
                  <PlayIcon />
                  활동
                </ToggleGroupItem>
                <ToggleGroupItem value="TRANSPORT" aria-label="이동수단">
                  <CarFrontIcon />
                  이동수단
                </ToggleGroupItem>
                <ToggleGroupItem value="MEAL" aria-label="식사">
                  <UtensilsIcon />
                  식사
                </ToggleGroupItem>
                <ToggleGroupItem value="CONCERT" aria-label="이벤트">
                  <Music />
                  이벤트
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
            <Field>
              <Label htmlFor="scheduleTitle">제목</Label>
              <Input id="scheduleTitle" placeholder="예시: 홍대입구역에서 출발" />
            </Field>
            <div className="flex gap-4">
              <Field className="flex-1">
                <Label htmlFor="scheduleStartTime">시작 시간</Label>
                <Input
                  type="time"
                  id="scheduleStartTime"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </Field>
              <Field className="flex-1">
                <Label htmlFor="scheduleDuration">소요 시간</Label>
                <Input type="text" id="scheduleDuration" placeholder="예: 30분" />
              </Field>
            </div>
            <Field>
              <Label htmlFor="scheduleLocation">장소</Label>
              <SearchPlaces placeholder="장소 또는 주소를 검색하세요" />
            </Field>
            <Field>
              <Label htmlFor="scheduleNotes">메모</Label>
              <Textarea
                id="scheduleNotes"
                placeholder="일정에 대한 메모를 작성하세요."
                className="h-20 resize-none"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">등록</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        aria-description="일정 항목 삭제"
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 이 일정 항목을 삭제하시겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
