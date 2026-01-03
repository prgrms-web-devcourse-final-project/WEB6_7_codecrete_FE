"use client";

import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

interface PlannerTimelineItemProps {
  planId: string;
  schedule: ScheduleDetail;
  role?: string;
  // 실제 사용시에는 onUpdate, onDelete 등의 props가 필요할 것입니다.
  concertCoords: ConcertCoords;
}

export default function PlannerTimelineItem({
  schedule,
  role,
  planId,
  concertCoords,
}: PlannerTimelineItemProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 메인 이벤트(공연)거나 식사일 때는 하단 그리드(비용/경로 등)를 숨김
  // const showDetailGrid = !schedule.isMainEvent;

  const handleDeleteConfirm = () => {
    // TODO: 삭제 API 호출 로직
    setShowDeleteDialog(false);
  };

  return (
    <>
      <article className="flex gap-6">
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
            "border-border bg-bg-sub text-text-main flex-1 space-y-4 rounded-xl border p-6",
            // 메인 이벤트 강조
            schedule.isMainEvent && "bg-point-main text-text-point-main",
            // 식사 일정 강조
            schedule.scheduleType === "MEAL" && "border-border-point bg-bg-main border-4 p-5"
          )}
        >
          {/* 헤더: 제목, 시간, 메뉴버튼 */}
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold">{schedule.title}</h4>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-medium whitespace-nowrap",
                  schedule.isMainEvent ? "text-bg-main" : "text-text-sub"
                )}
              >
                {formatTimeToKoreanAMPM(schedule.startAt)}
              </span>

              {/* 드롭다운 메뉴 */}
              {(role === "OWNER" || role === "EDITOR") && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" aria-label="메뉴 열기" className="size-8 p-0">
                      <MoreHorizontalIcon className="size-5" />
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
              className={cn("text-text-sub text-sm", schedule.isMainEvent && "text-text-point-sub")}
            >
              <p className="whitespace-pre-wrap">{schedule.details}</p>
            </div>
          )}

          {/* 하단 상세 정보 (구분선 포함) */}
          {schedule.scheduleType === "TRANSPORT" && <Separator className="bg-border my-3" />}
          <TimelineInfoGrid schedule={schedule} concertCoords={concertCoords} />
        </div>
      </article>

      {/* 다이얼로그 컴포넌트들 */}
      <EditScheduleDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        schedule={schedule}
        planId={planId}
      />

      <DeleteScheduleDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
