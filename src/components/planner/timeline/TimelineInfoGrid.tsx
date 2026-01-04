"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConcertCoords, ScheduleDetail } from "@/types/planner";
import { formatConcertPrice, formatDistance } from "@/utils/helpers/formatters";
import { calculateDistance } from "@/utils/helpers/geolocation";
import {
  ClockFadingIcon,
  MapIcon,
  MapPinIcon,
  TicketPercentIcon,
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TimelineInfoGridProps {
  schedule: ScheduleDetail;
  concertCoords: ConcertCoords;
}

export default function TimelineInfoGrid({ schedule, concertCoords }: TimelineInfoGridProps) {
  const router = useRouter();

  if (schedule.scheduleType === "MEAL") {
    if (!schedule.locationLat || !schedule.locationLon) {
      return null;
    }

    const distance = calculateDistance(
      concertCoords.lat,
      concertCoords.lon,
      schedule.locationLat,
      schedule.locationLon
    );

    return (
      <>
        <div className="text-text-sub flex flex-col flex-wrap gap-1 md:flex-row md:gap-x-10">
          <div className="flex items-center gap-1">
            <MapPinIcon className="size-3 lg:size-4" />
            <p className="text-xs leading-normal lg:text-sm">
              {schedule.location} (공연장에서 {formatDistance(distance)})
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ClockFadingIcon className="size-3 lg:size-4" />
            <p className="text-xs leading-normal lg:text-sm">{schedule.duration}분</p>
          </div>
        </div>
        <Separator />
        <Button type="button">
          <Link
            href={`https://map.naver.com/v5/search/${encodeURIComponent(schedule.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MapIcon /> 예약하기
          </Link>
        </Button>
      </>
    );
  }
  if (schedule.scheduleType === "WAITING") {
    if (!schedule.locationLat || !schedule.locationLon) {
      return null;
    }

    const distance = calculateDistance(
      concertCoords.lat,
      concertCoords.lon,
      schedule.locationLat,
      schedule.locationLon
    );

    return (
      <>
        <div className="text-text-sub flex flex-col flex-wrap gap-1 md:flex-row md:gap-x-10">
          <div className="flex items-center gap-1">
            <MapPinIcon className="size-3 lg:size-4" />
            <p className="text-xs leading-normal lg:text-sm">
              {schedule.location} (공연장에서 {formatDistance(distance)})
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ClockFadingIcon className="size-3 lg:size-4" />
            <p className="text-xs leading-normal lg:text-sm">{schedule.duration}분</p>
          </div>
        </div>
        <Separator />
        <Button type="button" variant="outline">
          <Link
            href={`https://map.naver.com/v5/search/${encodeURIComponent(schedule.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MapIcon /> 지도보기
          </Link>
        </Button>
      </>
    );
  }
  if (schedule.isMainEvent) {
    return (
      <>
        <div className="text-muted-foreground flex flex-col flex-wrap gap-1 md:flex-row md:gap-x-10">
          {schedule.concertMinPrice && schedule.concertMaxPrice && (
            <div className="flex items-center gap-1">
              <TicketPercentIcon className="size-3 lg:size-4" />
              <p className="text-xs leading-normal lg:text-sm">
                {formatConcertPrice(schedule.concertMinPrice, schedule.concertMaxPrice)}
              </p>
            </div>
          )}
          <div className="flex items-center gap-1">
            <ClockFadingIcon className="size-3 lg:size-4" />
            <p className="text-xs leading-normal lg:text-sm">{schedule.duration}분</p>
          </div>
        </div>
        <Separator />
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/concerts/${schedule.concertId}`)}
        >
          <WandSparklesIcon /> 상세정보
        </Button>
      </>
    );
  }
  if (schedule.scheduleType === "ACTIVITY") {
    return (
      <>
        <Separator />
        <div className="text-text-sub grid grid-cols-2 gap-3 text-sm">
          {schedule.location && (
            <div className="space-y-1">
              <h5 className="text-xs font-medium">위치</h5>
              <p className="text-text-main text-sm font-semibold">{schedule.location}</p>
            </div>
          )}
          <div className="space-y-1">
            <h5 className="text-xs font-medium">예상 시간</h5>
            <p className="text-text-main text-sm font-semibold">{schedule.duration}분</p>
          </div>
        </div>
      </>
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
