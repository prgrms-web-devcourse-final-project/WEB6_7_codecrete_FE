"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Bus, BusFrontIcon, Car, CarFrontIcon, Loader2 } from "lucide-react";
import {
  getCarRouteSummaryByKakaoMap,
  getTransitRouteDetailsByTmap,
} from "@/lib/api/planner/transport.client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { KakaoMapSummary, TMapSummary } from "@/types/planner";
import { Separator } from "@/components/ui/separator";
import { formatDistance } from "@/utils/helpers/formatters";

interface RouteCardProps {
  start: { lat: number; lon: number; name: string };
  end: { lat: number; lon: number; name: string };
}

export default function RouteCard({ start, end }: RouteCardProps) {
  const [transportType, setTransportType] = useState<"car" | "transit">("transit");
  const [carData, setCarData] = useState<KakaoMapSummary | null>(null);
  const [transitData, setTransitData] = useState<TMapSummary | null>(null);
  const [loadingCar, setLoadingCar] = useState(false);
  const [loadingTransit, setLoadingTransit] = useState(false);

  const coords = useMemo(
    () => ({
      startX: start.lon,
      startY: start.lat,
      endX: end.lon,
      endY: end.lat,
    }),
    [start.lon, start.lat, end.lon, end.lat]
  );

  const fetchCar = useCallback(async () => {
    if (carData) return;
    setLoadingCar(true);
    try {
      const res = await getCarRouteSummaryByKakaoMap(coords);
      setCarData(res);
    } catch (e) {
      console.error("자동차 탐색 실패", e);
    } finally {
      setLoadingCar(false);
    }
  }, [coords, carData]);

  // TODO : 대중교통 API 연동
  const fetchTransit = useCallback(async () => {
    if (transitData) return;
    setLoadingTransit(true);
    try {
      const res = await getTransitRouteDetailsByTmap(coords);
      setTransitData(res);
    } catch (e) {
      console.error("대중교통 탐색 실패", e);
    } finally {
      setLoadingTransit(false);
    }
  }, [coords, transitData]);

  useEffect(() => {
    fetchTransit();
  }, [fetchTransit]);

  const handleModeChange = (mode: "car" | "transit") => {
    setTransportType(mode);
    if (mode === "car") fetchCar();
    else fetchTransit();
  };

  return (
    <article className="relative flex gap-2 lg:gap-6">
      <div className="z-10 flex-none">
        <div className="border-bg-main bg-bg-sub flex size-10 items-center justify-center rounded-full border-2 lg:size-16 lg:border-4">
          {transportType === "car" ? (
            <CarFrontIcon className="size-4 lg:size-7" />
          ) : (
            <BusFrontIcon className="size-4 lg:size-7" />
          )}
        </div>
      </div>

      <div className="border-border bg-bg-sub text-text-main flex-1 space-y-3 rounded-xl border p-4 lg:space-y-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1 lg:space-y-2">
            <h4 className="text-base font-bold lg:text-lg">
              {transportType === "car" ? "자동차 경로" : "대중교통 경로"}
            </h4>
            <div className="text-text-sub text-xs leading-normal lg:text-sm">
              <p className="whitespace-pre-wrap">
                {start.name} → {end.name}
              </p>
            </div>
          </div>
          <ToggleGroup
            type="single"
            value={transportType}
            onValueChange={(value) => value && handleModeChange(value as "car" | "transit")}
            className="bg-muted"
          >
            <ToggleGroupItem
              value="transit"
              aria-label="대중교통 경로"
              className="size-auto px-2 py-1.5 lg:px-3"
            >
              <Bus className="size-3 lg:size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="car"
              aria-label="자동차 경로"
              className="size-auto px-2 py-1.5 lg:px-3"
            >
              <Car className="size-3 lg:size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Separator />
        {transportType === "car" &&
          (loadingCar ? (
            <div className="flex justify-center py-2">
              <Loader2 className="size-5 animate-spin text-gray-400" />
            </div>
          ) : carData ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <h5 className="text-text-sub text-xs font-medium">소요 시간</h5>
                <p className="text-sm">{Math.round(carData.duration / 60)} 분</p>
              </div>
              <div className="">
                <h5 className="text-text-sub text-xs font-medium">이동 거리</h5>
                <p className="text-sm">{formatDistance(carData.distance)}</p>
              </div>
            </div>
          ) : (
            <p className="text-text-sub py-2 text-center text-xs">경로를 찾을 수 없습니다.</p>
          ))}
        {transportType === "transit" && loadingTransit ? (
          <div className="flex justify-center py-2">
            <Loader2 className="text-primary size-5 animate-spin" />
          </div>
        ) : transitData ? (
          // <div className="grid grid-cols-2 gap-4">
          //   <div className="flex flex-col">
          //     <h5 className="text-text-sub text-xs font-medium">소요 시간</h5>
          //     <p className="text-sm">
          //       {Math.round(transitData.metaData.plan.itineraries[0].totalTime / 60)} 분
          //     </p>
          //   </div>
          //   <div className="flex flex-col">
          //     <h5 className="text-text-sub text-xs font-medium">이동 거리</h5>
          //     <p className="text-sm">
          //       {formatDistance(transitData.metaData.plan.itineraries[0].totalDistance)}
          //     </p>
          //   </div>
          //   {transitData.metaData.plan.itineraries[0].pathType < 4 && (
          //     <>
          //       <div className="flex flex-col">
          //         <h5 className="text-text-sub text-xs font-medium">환승 횟수</h5>
          //         <p className="text-sm">
          //           {transitData.metaData.plan.itineraries[0].transferCount}회
          //         </p>
          //       </div>
          //       <div className="flex flex-col">
          //         <h5 className="text-text-sub text-xs font-medium">예상 금액</h5>
          //         <p className="text-sm">
          //           {formatPrice(transitData.metaData.plan.itineraries[0].fare.regular.totalFare)}
          //         </p>
          //       </div>
          //     </>
          //   )}
          // </div>
          <p></p>
        ) : (
          <p className="text-text-sub py-2 text-center text-xs">경로를 찾을 수 없습니다.</p>
        )}
      </div>
    </article>
  );
}
