"use client";
import { ScheduleDetail } from "@/types/planner";
import { DoorOpenIcon, LinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

interface TimelineInfoGridProps {
  schedule: ScheduleDetail;
}

export default function TimelineInfoGrid({ schedule }: TimelineInfoGridProps) {
  // 이동 수단이 아니면 렌더링하지 않음
  if (schedule.scheduleType === "MEAL") {
    return (
      <div className="text-text-sub flex items-center justify-between">
        <div className="flex items-center gap-1">
          <MapPinIcon className="size-4" />
          <p className="text-sm">{schedule.location}</p>
        </div>
        <Link
          href={`https://map.naver.com/v5/search/${encodeURIComponent(schedule.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-main flex items-center gap-1 text-sm"
        >
          <LinkIcon className="size-4" /> 새 창에서 위치 보기
        </Link>
      </div>
    );
  }
  if (schedule.isMainEvent) {
    return (
      <div className="text-text-sub flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DoorOpenIcon className="size-4" />
          <p>~{schedule.duration}분</p>
        </div>
        <Link
          href={`/concerts/${schedule.concertId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-point-sub flex items-center gap-1 text-sm"
        >
          <LinkIcon className="size-4" /> 새 창에서 공연 정보 보기
        </Link>
      </div>
    );
  }
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
