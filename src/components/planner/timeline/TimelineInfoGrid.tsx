"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConcertCoords, ScheduleDetail } from "@/types/planner";
import { formatConcertPrice, formatDistance } from "@/utils/helpers/formatters";
import { calculateDistance } from "@/utils/helpers/geolocation";
import {
  BusFrontIcon,
  ChevronRightIcon,
  ClockFadingIcon,
  MapIcon,
  MapPinIcon,
  RouteIcon,
  TicketPercentIcon,
  TrainIcon,
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

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
          <div className="flex items-center gap-1">
            <MapPinIcon className="size-3 lg:size-4" />
            <p className="text-xs leading-normal lg:text-sm">{schedule.concertPlaceName}</p>
          </div>
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
          className="bg-bg-main!"
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
              <p className="text-text-main text-sm font-semibold">
                {schedule.location}
                <Link
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(schedule.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-muted-foreground/50 ml-2 text-xs underline"
                >
                  지도보기
                </Link>
              </p>
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

  const itineraries = schedule.transportRoute?.leg ?? [];
  const filteredLegs = itineraries?.filter((leg) => leg.mode !== "WALK") || [];

  const KAKAO_ROUTE_BY_FOOT = "foot";
  const KAKAO_ROUTE_BY_PUBLIC_TRANSIT = "publictransit";
  const KAKAO_ROUTE_BY_CAR = "car";
  const transportMap: Record<string, string> = {
    WALK: KAKAO_ROUTE_BY_FOOT,
    PUBLIC_TRANSPORT: KAKAO_ROUTE_BY_PUBLIC_TRANSIT,
    CAR: KAKAO_ROUTE_BY_CAR,
  };
  const transport = transportMap[schedule.transportType!] || KAKAO_ROUTE_BY_CAR;

  const kakaoUrl = `https://m.map.kakao.com/scheme/route?sp=${schedule.startPlaceLat},${schedule.startPlaceLon}&ep=${schedule.endPlaceLat},${schedule.endPlaceLon}&by=${transport}`;

  return (
    <>
      <Separator />
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
        {schedule.distance && (
          <div className="space-y-1">
            <h5 className="text-xs font-medium">이동 거리</h5>
            <p className="text-text-main text-sm font-semibold">
              {formatDistance(schedule.distance)}
            </p>
          </div>
        )}
        {schedule.transportType === "PUBLIC_TRANSPORT" && (
          <div className="space-y-1">
            <h5 className="text-xs font-medium">이동 경로</h5>
            <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
              {filteredLegs.map((leg, i) => {
                const routeColor = leg.routeColor ? `#${leg.routeColor}` : "#9ca3af";
                return (
                  <Fragment key={`${leg.routeId ?? leg.route}-${i}`}>
                    <div className="text-muted-foreground flex items-center text-[10px]">
                      <span
                        className="flex items-center justify-center gap-0.5 rounded px-1.5 py-0.5 font-bold text-white"
                        style={{ backgroundColor: routeColor }}
                      >
                        {leg.mode === "SUBWAY" && (
                          <>
                            <TrainIcon className="size-3" />
                            {leg.route}
                          </>
                        )}
                        {leg.mode === "BUS" && (
                          <>
                            <BusFrontIcon className="size-3" />
                            {getBusInitial(leg.route)}
                          </>
                        )}
                      </span>
                    </div>
                    {i < filteredLegs.length - 1 && (
                      <ChevronRightIcon className="text-muted-foreground size-3" />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Separator />
      <Link href={kakaoUrl} target="_blank" rel="noopener noreferrer" className="block">
        <Button type="button" variant="secondary">
          <RouteIcon />
          지도에서 길찾기
        </Button>
      </Link>
    </>
  );
}

function getBusInitial(name?: string) {
  if (!name) return <BusFrontIcon className="size-3" />;
  const match = name.match(/(\d+)/);
  if (match) return match[1];
  return name[0];
}
