"use client";

import { Itinerary } from "@/types/planner";
import { cn } from "@/lib/utils";
import { BusFrontIcon, FootprintsIcon, MapPinIcon, TrainIcon } from "lucide-react";
import { formatDuration } from "@/utils/helpers/formatters";
import { Separator } from "@/components/ui/separator";

interface TransitRouteTimelineProps {
  itinerary: Itinerary;
}

export default function TransitRouteTimeline({ itinerary }: TransitRouteTimelineProps) {
  const { legs } = itinerary;

  if (!legs || legs.length === 0) {
    return (
      <div className="text-muted-foreground py-4 text-center text-sm">
        상세 경로 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="border-input relative border-t p-3 lg:p-4">
      {legs.map((leg, index) => {
        const isLast = index === legs.length - 1;

        // 이동 수단별 색상 (API Hex 코드 사용, 없으면 기본값)
        const routeColor = leg.routeColor ? `#${leg.routeColor}` : "#e5e7eb";
        const lineColor = leg.mode === "WALK" ? "#d1d5db" : routeColor;
        const isWalk = leg.mode === "WALK";

        return (
          <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <>
                <div
                  className={cn(
                    "absolute top-6 left-[11px] h-[calc(100%-10px)] w-0.5 -translate-x-1/2",
                    isWalk && "w-0 border-l-2 border-dashed border-gray-300" // 도보는 점선
                  )}
                  style={!isWalk ? { backgroundColor: lineColor } : {}}
                />

                {/* 아이콘/노드 (타임라인 점) */}
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <div
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full border bg-white shadow-sm",
                      isWalk ? "border-gray-300" : "border-transparent text-white"
                    )}
                    style={!isWalk ? { backgroundColor: lineColor } : {}}
                  >
                    {getLegIcon(leg.mode, "size-3.5")}
                  </div>
                </div>

                {/* 내용 (출발지, 이동 정보) */}
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  {/* 출발지 이름 */}
                  <div className="truncate text-sm leading-tight font-semibold">
                    {leg.start.name}
                  </div>

                  {/* 이동 정보 (몇 분, 몇 정거장) */}
                  <div className="text-muted-foreground flex items-center gap-2 text-xs leading-normal">
                    <span
                      className={cn(
                        "rounded border px-1.5 py-0.5 text-[10px] font-medium",
                        isWalk
                          ? "border-gray-200 bg-gray-100 text-gray-600"
                          : "border-transparent text-white"
                      )}
                      style={!isWalk ? { backgroundColor: lineColor } : {}}
                    >
                      {isWalk ? "도보" : leg.route || leg.mode}
                    </span>

                    <span>{formatDuration(leg.sectionTime)}</span>

                    {/* 거리 or 정거장 수 */}
                    <Separator orientation="vertical" className="bg-muted h-3! w-px!" />
                    <span>
                      {isWalk
                        ? `${leg.distance}m`
                        : `${leg.passStopList?.stations.length || 0}개 정류장`}
                    </span>
                  </div>
                </div>
              </>
            )}
            {/* 마지막 도착지 표시 */}
            {isLast && (
              <div className="relative flex items-center gap-4 pb-6 last:pb-0">
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <div className="flex size-6 items-center justify-center rounded-full border bg-red-500 text-white">
                    <MapPinIcon className="size-3.5" />
                  </div>
                </div>
                <div className="truncate text-sm leading-tight font-semibold">도착</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getLegIcon(mode: string, className?: string) {
  switch (mode) {
    case "BUS":
      return <BusFrontIcon className={className} />;
    case "SUBWAY":
      return <TrainIcon className={className} />;
    default:
      return <FootprintsIcon className={cn(className, "text-gray-400")} />;
  }
}
