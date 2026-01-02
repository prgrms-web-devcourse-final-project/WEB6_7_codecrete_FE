"use client";

import { ScheduleDetail } from "@/types/planner";

interface TimelineInfoGridProps {
  schedule: ScheduleDetail;
}

export default function TimelineInfoGrid({ schedule }: TimelineInfoGridProps) {
  // 이동 수단이 아니면 렌더링하지 않음
  if (schedule.scheduleType !== "TRANSPORT") return null;

  return (
    <div className="text-text-sub grid grid-cols-2 gap-3 text-sm">
      {schedule.transportType !== "WALK" && (
        <div className="space-y-1">
          <h5 className="text-xs font-medium">예상 금액</h5>
          <p className="text-text-main text-sm font-semibold">
            {schedule.estimatedCost.toLocaleString()}원
          </p>
        </div>
      )}
      <div className="space-y-1">
        <h5 className="text-xs font-medium">예상 시간</h5>
        <p className="text-text-main text-sm font-semibold">{schedule.duration}분</p>
      </div>
      {schedule.transportType === "PUBLIC_TRANSPORT" && (
        <div className="space-y-1">
          <h5 className="text-xs font-medium">이동 경로</h5>
          <p className="text-text-main text-sm font-semibold">{schedule.location}</p>
        </div>
      )}
      <div className="space-y-1">
        <h5 className="text-xs font-medium">이동 거리</h5>
        <p className="text-text-main text-sm font-semibold">{schedule.distance}m</p>
      </div>
    </div>
  );
}
