"use client";

import { useState } from "react";
import { MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ConcertCoords, ScheduleDetail } from "@/types/planner";

// 분리한 하위 컴포넌트들 임포트
import TimelineIcon from "./TimelineIcon";
import TimelineInfoGrid from "./TimelineInfoGrid";
import EditScheduleDialog from "../dialogs/EditScheduleDialog";
import DeleteScheduleDialog from "../dialogs/DeleteScheduleDialog";
import { formatTimeToKoreanAMPM } from "@/utils/helpers/formatters";
import { deletePlanSchedule } from "@/lib/api/planner/schedule.client";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface PlannerTimelineItemProps {
  planId: string;
  role?: string;
  concertCoords: ConcertCoords;
  schedule: ScheduleDetail;
}

export default function PlannerTimelineItem({
  planId,
  role,
  concertCoords,
  schedule,
}: PlannerTimelineItemProps) {
  const router = useRouter();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!planId || !schedule.id) return;
    try {
      await deletePlanSchedule({ planId, scheduleId: schedule.id });
      setShowDeleteDialog(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete schedule", error);
    }
  };

  return (
    <>
      <article className="relative flex gap-2 lg:gap-6">
        {/* 좌측: 아이콘 영역 */}
        <TimelineIcon
          type={schedule.scheduleType}
          transportType={schedule?.transportType}
          isMainEvent={schedule.isMainEvent ?? false}
          concertId={schedule.concertId}
        />

        {/* 우측: 컨텐츠 영역 */}
        <div
          className={cn(
            "border-border bg-bg-sub text-text-main flex-1 space-y-3 rounded-xl border p-4 lg:space-y-4 lg:p-6",
            // 메인 이벤트 강조
            schedule.isMainEvent && "bg-point-main",
            // 식사 일정
            schedule.scheduleType === "MEAL" &&
              "border-border-point bg-bg-main border-3 lg:border-4",
            // 대기(카페) 일정
            schedule.scheduleType === "WAITING" && "border-border bg-bg-main border-3 lg:border-4"
          )}
        >
          {/* 헤더: 제목, 시간, 메뉴버튼 */}
          <div
            className={cn("space-y-1 lg:space-y-2", schedule.isMainEvent && "text-text-point-main")}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-base font-bold lg:text-lg">{schedule.title}</h4>
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "text-xs leading-normal font-medium whitespace-nowrap lg:text-sm",
                    schedule.isMainEvent ? "text-bg-main" : "text-text-sub"
                  )}
                >
                  {formatTimeToKoreanAMPM(schedule.startAt)}
                </span>

                {/* 드롭다운 메뉴 */}
                {(role === "OWNER" || role === "EDITOR") && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        aria-label="메뉴 열기"
                        className="size-6 p-0 lg:size-7"
                      >
                        <MoreVerticalIcon className="size-3 lg:size-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* 메인 이벤트 시간 등록/수정용 (공연 시작시간이 등록 안됨) */}
                      <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
                        {schedule.isMainEvent ? "공연 시간 설정" : "수정"}
                      </DropdownMenuItem>

                      {/* 메인 이벤트가 아닐 때만 삭제 허용 */}
                      {!schedule.isMainEvent && (
                        <DropdownMenuItem
                          onSelect={() => setShowDeleteDialog(true)}
                          className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950"
                        >
                          삭제
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            {/* 본문: 상세 설명 */}
            {schedule.details && (
              <div
                className={cn(
                  "text-text-sub text-xs leading-normal lg:text-sm",
                  schedule.isMainEvent && "text-text-point-sub"
                )}
              >
                <p className="whitespace-pre-wrap">{schedule.details}</p>
              </div>
            )}
          </div>

          {schedule.scheduleType === "TRANSPORT" && <Separator className="bg-muted" />}
          {/* 하단 상세 정보 */}
          <TimelineInfoGrid schedule={schedule} concertCoords={concertCoords} />
        </div>
      </article>

      {/* 다이얼로그 컴포넌트들 */}
      <EditScheduleDialog
        key={schedule.id}
        planId={planId}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        schedule={schedule}
      />

      <DeleteScheduleDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
