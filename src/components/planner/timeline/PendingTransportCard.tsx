"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bus, Car, FootprintsIcon, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  getCarRouteSummaryByKakaoMap,
  getTransitRouteDetailsByTmap,
  getWalkRouteByTmap,
} from "@/lib/api/planner/transport.client";
import { createPlanSchedule } from "@/lib/api/planner/schedule.client";
import { transformTransportSchedule } from "@/utils/helpers/scheduleTransform";
import { formatDistance, formatPrice } from "@/utils/helpers/formatters";
import type {
  KakaoMapSummary,
  TMapSummary,
  ScheduleDetail,
  Itinerary,
  TMapDetail,
} from "@/types/planner";
import { calculateDistance } from "@/utils/helpers/geolocation";
import TransitRouteList from "./TransitRouteList";

interface PendingTransportCardProps {
  fromSchedule: ScheduleDetail;
  toSchedule: ScheduleDetail;
  planId: string;
}

export default function PendingTransportCard({
  fromSchedule,
  toSchedule,
  planId,
}: PendingTransportCardProps) {
  const router = useRouter();

  const hasValidCoords =
    fromSchedule.locationLon &&
    fromSchedule.locationLat &&
    toSchedule.locationLon &&
    toSchedule.locationLat;

  // 현재 선택된 이동수단 타입
  const [transportType, setTransportType] = useState<"transit" | "car" | "walk">("transit");
  // 각 이동수단별 상태
  const [carData, setCarData] = useState<KakaoMapSummary | null>(null);
  const [transitData, setTransitData] = useState<TMapDetail | null>(null);
  const [walkData, setWalkData] = useState<TMapSummary | null>(null);
  // API 로딩 상태
  const [loadingCar, setLoadingCar] = useState(false);
  const [loadingTransit, setLoadingTransit] = useState(false);
  const [loadingWalk, setLoadingWalk] = useState(false);
  // 확정 처리 상태
  const [isConfirming, setIsConfirming] = useState(false);

  // 선택한 대중교통 경로
  const [selectedTransitRoute, setSelectedTransitRoute] = useState<Itinerary | null>(null);
  const [selectedTransitIndex, setSelectedTransitIndex] = useState<number | null>(null);

  const coords = useMemo(() => {
    if (!hasValidCoords) return null;

    return {
      startX: fromSchedule.locationLon!,
      startY: fromSchedule.locationLat!,
      endX: toSchedule.locationLon!,
      endY: toSchedule.locationLat!,
    };
  }, [fromSchedule, toSchedule, hasValidCoords]);

  const straightDistance = useMemo(() => {
    if (!coords) return 0;
    return calculateDistance(coords.startY, coords.startX, coords.endY, coords.endX);
  }, [coords]);

  // 자동차 경로 조회
  const fetchCar = useCallback(async () => {
    if (carData || !coords) return;
    setLoadingCar(true);
    try {
      const res = await getCarRouteSummaryByKakaoMap(coords);
      setCarData({
        distance: res.distance,
        duration: res.duration,
        fare: res.fare,
      });
    } catch (e) {
      console.error("자동차 탐색 실패", e);
      toast.error("자동차 경로를 불러올 수 없습니다.");
    } finally {
      setLoadingCar(false);
    }
  }, [coords, carData]);

  // 도보 경로 조회
  const fetchWalk = useCallback(async () => {
    if (walkData || !coords) return;
    setLoadingWalk(true);
    try {
      const walk = await getWalkRouteByTmap(coords);
      setWalkData({
        metaData: {
          plan: {
            itineraries: [
              {
                totalTime: walk.totalTime,
                totalDistance: walk.totalDistance,
                transferCount: 0,
                fare: {
                  regular: {
                    totalFare: 0,
                    currency: {
                      symbol: "￦",
                      currency: "원",
                      currencyCode: "KRW",
                    },
                  },
                },
                pathType: 5,
              },
            ],
          },
          requestParameters: {
            reqDttm: "",
            startX: coords.startX,
            startY: coords.startY,
            endX: coords.endX,
            endY: coords.endY,
          },
        },
      });
    } catch (walkError) {
      console.error("도보 경로 탐색 실패, 직선 거리 기반 추정", walkError);

      const estimatedDistance = Math.round(straightDistance * 1.3);
      const estimatedTime = Math.round((estimatedDistance / 67) * 60);

      setWalkData({
        metaData: {
          plan: {
            itineraries: [
              {
                totalTime: estimatedTime,
                totalDistance: estimatedDistance,
                transferCount: 0,
                fare: {
                  regular: {
                    totalFare: 0,
                    currency: {
                      symbol: "￦",
                      currency: "원",
                      currencyCode: "KRW",
                    },
                  },
                },
                pathType: 5,
              },
            ],
          },
          requestParameters: {
            reqDttm: "",
            startX: coords.startX,
            startY: coords.startY,
            endX: coords.endX,
            endY: coords.endY,
          },
        },
      });
    } finally {
      setLoadingWalk(false);
    }
  }, [coords, walkData, straightDistance]);

  // 대중교통 경로 조회
  const fetchTransit = useCallback(async () => {
    if (transitData || !coords) return;
    setLoadingTransit(true);
    try {
      const res: TMapDetail = await getTransitRouteDetailsByTmap(coords);
      setTransitData(res);
      if (!res.metaData?.plan || res.metaData.plan.itineraries.length === 0) {
        setTransportType("walk");
        fetchWalk();
      } else {
        setSelectedTransitRoute(res.metaData.plan.itineraries[0]);
        setSelectedTransitIndex(0);
      }
    } catch (e) {
      toast.error("대중교통 경로를 불러올 수 없습니다. 도보로 전환합니다.");
      console.error("대중교통 탐색 실패", e);
      setTransportType("walk");
      fetchWalk();
    } finally {
      setLoadingTransit(false);
    }
  }, [coords, transitData, fetchWalk]);

  // 초기 로드 시 대중교통 조회
  useEffect(() => {
    if (coords) {
      fetchTransit();
    }
  }, [coords, fetchTransit]);

  const handleModeChange = (mode: "transit" | "car" | "walk") => {
    setTransportType(mode);
    if (mode === "car") fetchCar();
    else if (mode === "walk") fetchWalk();
    else fetchTransit();
  };

  // 대중교통 경로 선택 핸들러
  const handleTransitRouteSelect = (route: Itinerary | null, index: number | null) => {
    setSelectedTransitRoute(route);
    setSelectedTransitIndex(index);
  };

  // 확정하기 핸들러
  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
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
        const firstRoute = walkData.metaData?.plan.itineraries[0] as Itinerary;

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
        return;
      }

      await createPlanSchedule({
        planId,
        scheduleData: transportData,
      });

      toast.success("이동 경로가 확정되었습니다.");
      router.refresh();
    } catch (error) {
      console.error("Transport confirmation error:", error);
      toast.error("이동 경로 확정에 실패했습니다.");
    } finally {
      setIsConfirming(false);
    }
  };

  if (!hasValidCoords) {
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
      <div className="z-10 flex-none">
        <div className="border-border bg-bg-main flex size-10 items-center justify-center rounded-full border-2 border-dashed lg:size-16 lg:border-4">
          {transportType === "car" ? (
            <Car className="stroke-text-sub size-4 lg:size-7" />
          ) : transportType === "transit" && transitData?.metaData?.plan ? (
            <Bus className="stroke-text-sub size-4 lg:size-7" />
          ) : (
            <FootprintsIcon className="stroke-text-sub size-4 lg:size-7" />
          )}
        </div>
      </div>

      <div className="border-border bg-bg-main flex-1 space-y-3 rounded-xl border-2 border-dashed p-4 lg:space-y-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1 lg:space-y-2">
            <h4 className="text-base font-bold lg:text-lg">
              {transportType === "car"
                ? "택시 이용 시"
                : transportType === "transit" && transitData?.metaData?.plan
                  ? "대중교통 이용 시"
                  : "도보 이용 시"}
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
              value && handleModeChange(value as "transit" | "car" | "walk")
            }
            className="bg-muted text-muted-foreground [&>button[data-state=on]]:text-accent-foreground"
          >
            {/* 대중교통 데이터 있을 때만 */}
            {transitData?.metaData?.plan && (
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

        {/* 자동차 경로 정보 */}
        {transportType === "car" &&
          (loadingCar ? (
            <div className="flex justify-center py-2">
              <Loader2 className="size-5 animate-spin text-gray-400" />
            </div>
          ) : carData ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <h5 className="text-muted-foreground text-xs font-medium">소요 시간</h5>
                <p className="text-text-main text-sm font-semibold">
                  {Math.round(carData.duration / 60)}분
                </p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-muted-foreground text-xs font-medium">이동 거리</h5>
                <p className="text-text-main text-sm font-semibold">
                  {formatDistance(carData.distance)}
                </p>
              </div>
              {carData.fare?.taxi && (
                <div className="flex flex-col">
                  <h5 className="text-muted-foreground text-xs font-medium">예상 택시비</h5>
                  <p className="text-text-main text-sm font-semibold">
                    {formatPrice(carData.fare.taxi)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground py-2 text-center text-xs">
              경로를 찾을 수 없습니다.
            </p>
          ))}

        {/* 도보 경로 정보 */}
        {transportType === "walk" &&
          (loadingWalk ? (
            <div className="flex justify-center py-2">
              <Loader2 className="size-5 animate-spin" />
            </div>
          ) : walkData?.metaData?.plan?.itineraries &&
            walkData.metaData.plan.itineraries.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <h5 className="text-muted-foreground text-xs font-medium">소요 시간</h5>
                <p className="text-text-main text-sm font-semibold">
                  {Math.round(walkData.metaData.plan.itineraries[0].totalTime / 60)}분
                </p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-muted-foreground text-xs font-medium">이동 거리</h5>
                <p className="text-text-main text-sm font-semibold">
                  {formatDistance(walkData.metaData.plan.itineraries[0].totalDistance)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground py-2 text-center text-xs">
              경로를 찾을 수 없습니다.
            </p>
          ))}

        {/* 대중교통 경로 정보 (길찾기 경로) */}
        {transportType === "transit" &&
          (loadingTransit ? (
            <div className="flex justify-center py-2">
              <Loader2 className="size-5 animate-spin" />
            </div>
          ) : transitData?.metaData?.plan?.itineraries &&
            transitData.metaData.plan.itineraries.length > 0 ? (
            <TransitRouteList
              itineraries={transitData.metaData.plan.itineraries}
              onSelect={handleTransitRouteSelect}
              selectedIndex={selectedTransitIndex}
            />
          ) : (
            <p className="text-muted-foreground py-2 text-center text-xs">
              경로를 찾을 수 없습니다.
            </p>
          ))}

        <Button
          onClick={handleConfirm}
          disabled={isConfirming || loadingCar || loadingTransit || loadingWalk}
        >
          {isConfirming ? (
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
      </div>
    </article>
  );
}
