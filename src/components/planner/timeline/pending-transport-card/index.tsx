"use client";
import { useMemo, useState } from "react";
import { Bus, Car, FootprintsIcon, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createPlanSchedule } from "@/lib/api/planner/schedule.client";
import { transformTransportSchedule } from "@/utils/helpers/scheduleTransform";
import { formatDistance, formatDuration, formatPrice } from "@/utils/helpers/formatters";
import {
  type ScheduleDetail,
  type Itinerary,
  type Coords,
  isTMapDetailClose,
} from "@/types/planner";
import { calculateDistance } from "@/utils/helpers/geolocation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCarRoute, useTransitRoute, useWalkRoute } from "@/hooks/useTransport";
import { plannerQueryKeys } from "@/queries/planner";
import RouteInfoItem from "../route-card/RouteInfoItem";
import RouteLoadingSpinner from "../route-card/RouteLoadingSpinner";
import RouteNotFound from "../route-card/RouteNotFound";
import TransitRouteList from "./transit/TransitRouteList";

interface PendingTransportCardProps {
  fromSchedule: ScheduleDetail;
  toSchedule: ScheduleDetail;
  planId: string;
  isStart?: boolean;
}

export default function PendingTransportCard({
  fromSchedule,
  toSchedule,
  planId,
  isStart,
}: PendingTransportCardProps) {
  const queryClient = useQueryClient();

  // 사용자 선택 상태 (탭)
  const [userTransportType, setUserTransportType] = useState<"transit" | "car" | "walk">("transit");
  // 대중교통 경로 선택 인덱스
  const [selectedTransitIndex, setSelectedTransitIndex] = useState<number | null>(null);

  const coords: Coords | null = useMemo(() => {
    const { locationLon: fromLon, locationLat: fromLat } = fromSchedule;
    const { locationLon: toLon, locationLat: toLat } = toSchedule;
    if (!fromLon || !fromLat || !toLon || !toLat) return null;
    return { startX: fromLon, startY: fromLat, endX: toLon, endY: toLat };
  }, [fromSchedule, toSchedule]);

  const straightDistance = useMemo(() => {
    if (!coords) return 0;
    return calculateDistance(coords.startY, coords.startX, coords.endY, coords.endX);
  }, [coords]);

  const { data: transitData, isLoading: loadingTransit } = useTransitRoute(coords);

  // 대중교통 경로 중 유효한 경로가 있는지 확인
  const itineraries = useMemo(
    () =>
      !transitData || isTMapDetailClose(transitData)
        ? []
        : (transitData.metaData?.plan?.itineraries ?? []),
    [transitData]
  );
  const recommendedTransitIndex = useMemo(() => {
    if (itineraries.length === 0) return null;

    const TRANSFER_PENALTY_SECONDS = 5 * 60;
    return itineraries.reduce(
      (best, route, index) => {
        const score = route.totalTime + (route?.transferCount ?? 0) * TRANSFER_PENALTY_SECONDS;
        return score < best.score ? { index, score } : best;
      },
      { index: 0, score: Infinity }
    ).index;
  }, [itineraries]);

  const effectiveSelectedTransitIndex = selectedTransitIndex ?? recommendedTransitIndex;
  // 대중교통 데이터 없으면 자동으로 walk로 파생
  const transportType: "transit" | "car" | "walk" =
    userTransportType === "transit" && !itineraries.length && !loadingTransit
      ? "walk"
      : userTransportType;
  // index로 선택 경로 파생
  const selectedTransitRoute: Itinerary | null =
    effectiveSelectedTransitIndex === null
      ? null
      : (itineraries[effectiveSelectedTransitIndex] ?? null);

  // 자동차/도보 데이터는 transportType에 따라 조건부로 쿼리 실행
  const { data: carData, isLoading: loadingCar } = useCarRoute(
    transportType === "car" ? coords : null
  );
  const { data: walkData, isLoading: loadingWalk } = useWalkRoute(
    transportType === "walk" ? coords : null,
    straightDistance
  );

  const isLoading = loadingCar || loadingTransit || loadingWalk;

  const confirmMutation = useMutation({
    mutationFn: () => {
      let transportData;

      if (transportType === "car" && carData) {
        transportData = transformTransportSchedule(fromSchedule, toSchedule, {
          transportCandidates: [fromSchedule, toSchedule],
          selectedRoute: null,
          carRouteSummary: carData,
          walkRouteSummary: null,
        });
        transportData.transportType = "CAR";
      } else if (transportType === "walk" && walkData) {
        const firstRoute = walkData.metaData!.plan.itineraries[0] as Itinerary;
        transportData = transformTransportSchedule(fromSchedule, toSchedule, {
          transportCandidates: [fromSchedule, toSchedule],
          selectedRoute: null,
          carRouteSummary: null,
          walkRouteSummary: {
            totalTime: firstRoute.totalTime,
            totalDistance: firstRoute.totalDistance,
          },
        });
        transportData.transportType = "WALK";
      } else if (transportType === "transit" && selectedTransitRoute) {
        transportData = transformTransportSchedule(fromSchedule, toSchedule, {
          transportCandidates: [fromSchedule, toSchedule],
          selectedRoute: selectedTransitRoute,
          carRouteSummary: null,
          walkRouteSummary: null,
        });
        transportData.transportType = "PUBLIC_TRANSPORT";
      } else {
        toast.error("경로를 선택해주세요.");
        return Promise.reject(new Error("No valid transport data"));
      }

      return createPlanSchedule({ planId, scheduleData: transportData });
    },
    onSuccess: () => {
      toast.success("이동 경로가 확정되었습니다.");
      queryClient.invalidateQueries({ queryKey: plannerQueryKeys.detail(planId) });
    },
    onError: (error) => {
      toast.error(error.message || "이동 경로 확정에 실패했습니다.");
    },
  });

  if (!coords) {
    return (
      <article className="relative flex gap-2 lg:gap-6">
        <div className="z-10 flex-none">
          <div className="flex size-10 items-center justify-center rounded-full border-2 border-red-400 bg-red-50 lg:size-16 lg:border-4">
            <Bus className="size-4 text-red-600 lg:size-7" />
          </div>
        </div>
        <div className="flex-1 rounded-xl border-2 border-dashed border-red-400 bg-red-50/50 p-4">
          <p className="text-sm text-red-600">일정의 위치 정보가 없어 경로를 찾을 수 없습니다.</p>
        </div>
      </article>
    );
  }

  return (
    <article className="relative flex gap-2 lg:gap-6">
      {/* 좌측 아이콘 */}
      <div className="z-10 flex-none">
        <div className="border-border bg-bg-main flex size-10 items-center justify-center rounded-full border-2 border-dashed lg:size-16 lg:border-4">
          {transportType === "car" ? (
            <Car className="stroke-text-sub size-4 lg:size-7" />
          ) : transportType === "transit" && selectedTransitRoute ? (
            <Bus className="stroke-text-sub size-4 lg:size-7" />
          ) : (
            <FootprintsIcon className="stroke-text-sub size-4 lg:size-7" />
          )}
        </div>
      </div>

      {/* 우측 컨텐츠 */}
      <div className="border-border bg-bg-main flex-1 space-y-3 rounded-xl border-2 border-dashed p-4 lg:space-y-4 lg:p-6">
        {/* 헤더 */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 lg:space-y-2">
            <h4 className="text-base font-bold lg:text-lg">
              {transportType === "car" && "택시 이용 시"}
              {transportType === "transit" && "대중교통 이용 시"}
              {transportType === "walk" && "도보 이용 시"}
            </h4>
            <div className="text-muted-foreground text-xs leading-normal lg:text-sm">
              <p>
                {fromSchedule.title} → {toSchedule.title}
              </p>
            </div>
          </div>

          <ToggleGroup
            type="single"
            value={transportType}
            onValueChange={(value) =>
              value && setUserTransportType(value as "transit" | "car" | "walk")
            }
            className="bg-muted text-muted-foreground [&>button[data-state=on]]:text-accent-foreground"
          >
            {itineraries.length > 0 && (
              <ToggleGroupItem
                value="transit"
                aria-label="대중교통 경로"
                className="size-auto px-2 py-1.5 lg:px-3"
              >
                <Bus className="size-3 lg:size-4" />
              </ToggleGroupItem>
            )}
            <ToggleGroupItem
              value="car"
              aria-label="택시 경로"
              className="size-auto px-2 py-1.5 lg:px-3"
            >
              <Car className="size-3 lg:size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="walk"
              aria-label="도보 경로"
              className="size-auto px-2 py-1.5 lg:px-3"
            >
              <FootprintsIcon className="size-3 lg:size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Separator />

        {/* 자동차 */}
        {transportType === "car" &&
          (loadingCar ? (
            <RouteLoadingSpinner />
          ) : carData ? (
            <div className="grid grid-cols-2 gap-4">
              <RouteInfoItem label="소요 시간" value={formatDuration(carData.duration)} />
              <RouteInfoItem label="이동 거리" value={formatDistance(carData.distance)} />
              {carData.fare?.taxi && (
                <RouteInfoItem label="예상 택시비" value={formatPrice(carData.fare.taxi)} />
              )}
            </div>
          ) : (
            <RouteNotFound />
          ))}

        {/* 도보 */}
        {transportType === "walk" &&
          (loadingWalk ? (
            <RouteLoadingSpinner />
          ) : walkData?.metaData?.plan?.itineraries?.length ? (
            <div className="grid grid-cols-2 gap-4">
              <RouteInfoItem
                label="소요 시간"
                value={`${formatDuration(walkData.metaData.plan.itineraries[0].totalTime)}`}
              />
              <RouteInfoItem
                label="이동 거리"
                value={formatDistance(walkData.metaData.plan.itineraries[0].totalDistance)}
              />
            </div>
          ) : (
            <RouteNotFound />
          ))}

        {/* 대중교통 */}
        {transportType === "transit" &&
          (loadingTransit ? (
            <RouteLoadingSpinner />
          ) : itineraries.length > 0 ? (
            <TransitRouteList
              itineraries={itineraries}
              onSelect={(_, index) => setSelectedTransitIndex(index)}
              selectedIndex={effectiveSelectedTransitIndex}
            />
          ) : (
            <RouteNotFound />
          ))}

        {!isStart && (
          <>
            <Separator />
            <Button
              onClick={() => confirmMutation.mutate()}
              disabled={confirmMutation.isPending || isLoading}
            >
              {confirmMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  확정 중...
                </>
              ) : (
                <>
                  <CheckCircle />이 경로로 확정하기
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
