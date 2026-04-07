"use client";
import { Button } from "@/components/ui/button";
import { useSearchPlace } from "@/hooks/planner/useSearchPlace";
import { cn } from "@/lib/utils";
import { NearbyPlaces, ScheduleDetail } from "@/types/planner";
import { formatDistance } from "@/utils/helpers/formatters";
import { calculateDistance } from "@/utils/helpers/geolocation";
import { Loader2Icon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const INITIAL_DISPLAY_COUNT = 3;

export default function PlannerNearbyRestaurants({
  concertSchedule,
}: {
  concertSchedule: ScheduleDetail;
}) {
  const coords = { lat: concertSchedule.locationLat!, lon: concertSchedule.locationLon! };

  const { results, isLoading, stableCoords } = useSearchPlace("", coords, "MEAL");
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleResults = isExpanded ? results : results.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <div className="bg-bg-main border-border flex-1 lg:overflow-hidden lg:border lg:p-6">
      <h4 className="text-base font-semibold">주변 식당</h4>
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2Icon className="text-muted-foreground animate-spin" />
        </div>
      ) : results.length === 0 ? (
        <div className="text-text-sub flex items-center justify-center py-10 text-sm">
          주변에 식당이 없습니다.
        </div>
      ) : (
        <>
          <ul className={cn("space-y-3", isExpanded && "lg:pr-2")}>
            {visibleResults.map((place: NearbyPlaces) => {
              const distance = stableCoords
                ? calculateDistance(
                    stableCoords.lat,
                    stableCoords.lon,
                    Number(place.y),
                    Number(place.x)
                  )
                : 0;

              return (
                <li key={place.place_url} className="bg-bg-sub flex flex-col gap-1 rounded-xl p-4">
                  <strong>{place.place_name}</strong>
                  <span className="text-text-sub text-xs">{place.road_address_name}</span>
                  <div className="flex justify-between text-xs">
                    <Link
                      href={place.place_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground underline"
                    >
                      상세 보기
                    </Link>
                    <span className="text-text-sub">{formatDistance(distance)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          {results.length > INITIAL_DISPLAY_COUNT && (
            <Button
              variant="outline"
              className="w-full cursor-pointer gap-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDownIcon
                className={cn("size-4 transition-transform", isExpanded && "rotate-180")}
              />
              {isExpanded ? "숨기기" : `${results.length - INITIAL_DISPLAY_COUNT}개 더보기`}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
