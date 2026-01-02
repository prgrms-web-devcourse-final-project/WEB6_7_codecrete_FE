"use client";

import {
  CarFrontIcon,
  FootprintsIcon,
  Music,
  SparklesIcon,
  TrainIcon,
  UtensilsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleType, TransportType } from "@/types/planner";

interface TimelineIconProps {
  type: ScheduleType;
  isMainEvent: boolean;
  transportType?: TransportType;
  concertId?: number;
}

export default function TimelineIcon({
  type,
  transportType,
  isMainEvent,
  concertId,
}: TimelineIconProps) {
  const getIcon = () => {
    switch (type) {
      case "TRANSPORT":
        if (transportType === "WALK") return <FootprintsIcon className="stroke-text-sub" />;
        if (transportType === "PUBLIC_TRANSPORT") return <TrainIcon className="stroke-text-sub" />;
        return <CarFrontIcon className="stroke-text-sub" />;
      case "MEAL":
        return <UtensilsIcon className="stroke-text-main" />;
      default:
        // 메인 이벤트(공연)인데 타입이 명시되지 않은 경우
        if (isMainEvent) return <Music className="stroke-text-point-main" />;
        return <SparklesIcon className="fill-text-sub stroke-text-sub" />;
    }
  };

  return (
    <div
      className={cn(
        "border-bg-main bg-bg-sub flex size-16 shrink-0 items-center justify-center rounded-full border-4",
        // 콘서트(메인)일 경우 강조 스타일
        concertId && "bg-point-main border-white shadow-md shadow-zinc-900/20",
        // 식사일 경우 강조 스타일
        type === "MEAL" && "bg-bg-main border-point-main",
        // MainEvent 속성이 있지만 콘서트 ID가 없는 특수 케이스 대응
        isMainEvent && !concertId && "bg-point-main border-white"
      )}
    >
      {getIcon()}
    </div>
  );
}
