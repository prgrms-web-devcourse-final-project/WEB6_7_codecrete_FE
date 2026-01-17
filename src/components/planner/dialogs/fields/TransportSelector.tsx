"use client";
import { useState, useEffect, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { ScheduleFormData } from "@/lib/zod/schedule.schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TransitRouteList from "../../timeline/TransitRouteList";
import {
  ScheduleDetail,
  TransportType,
  Itinerary,
  KakaoMapSummary,
  TMapWalkRoute,
} from "@/types/planner";
import { getScheduleEndTime } from "@/utils/helpers/scheduleTransform";
import {
  getTransitRouteDetailsByTmap,
  getCarRouteSummaryByKakaoMap,
  getWalkRouteByTmap,
} from "@/lib/api/planner/transport.client";
import { toast } from "sonner";

interface TransportSelectorProps {
  form: UseFormReturn<ScheduleFormData>;
  transportCandidates: ScheduleDetail[];
  onRouteDataChange: (data: {
    routeData: Itinerary[];
    selectedRoute: Itinerary | null;
    carRouteSummary: KakaoMapSummary | null;
    walkRouteSummary: TMapWalkRoute | null;
  }) => void;
}

export function TransportSelector({
  form,
  transportCandidates,
  onRouteDataChange,
}: TransportSelectorProps) {
  const [isRouteFetching, setIsRouteFetching] = useState(false);
  const [routeData, setRouteData] = useState<Itinerary[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Itinerary | null>(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
  const [carRouteSummary, setCarRouteSummary] = useState<KakaoMapSummary | null>(null);
  const [walkRouteSummary, setWalkRouteSummary] = useState<TMapWalkRoute | null>(null);

  const startScheduleId = form.watch("startScheduleId");
  const endScheduleId = form.watch("endScheduleId");
  const transportType = form.watch("transportType");

  // 길찾기 API 호출
  const handleFetchRoute = useCallback(
    async (startId: string, endId: string, currentTransportType: TransportType) => {
      setIsRouteFetching(true);
      setRouteData([]);
      setSelectedRoute(null);
      setCarRouteSummary(null);
      setWalkRouteSummary(null);

      try {
        const startSchedule = transportCandidates.find((s) => String(s.id) === startId);
        const endSchedule = transportCandidates.find((s) => String(s.id) === endId);

        if (!startSchedule || !endSchedule) {
          toast.error("출발/도착 일정 정보를 불러올 수 없습니다.");
          return;
        }

        if (currentTransportType === "PUBLIC_TRANSPORT") {
          const data = await getTransitRouteDetailsByTmap({
            startX: startSchedule.locationLon!,
            startY: startSchedule.locationLat!,
            endX: endSchedule.locationLon!,
            endY: endSchedule.locationLat!,
          });
          const itineraries = data?.metaData?.plan.itineraries || [];
          setRouteData(itineraries);
          form.setValue("routeData", itineraries);
        } else if (currentTransportType === "CAR") {
          const summary = await getCarRouteSummaryByKakaoMap({
            startX: startSchedule.locationLon!,
            startY: startSchedule.locationLat!,
            endX: endSchedule.locationLon!,
            endY: endSchedule.locationLat!,
          });
          setCarRouteSummary(summary);
          form.setValue("carRouteSummary", summary);
        } else if (currentTransportType === "WALK") {
          const summary = await getWalkRouteByTmap({
            startX: startSchedule.locationLon!,
            startY: startSchedule.locationLat!,
            endX: endSchedule.locationLon!,
            endY: endSchedule.locationLat!,
          });
          setWalkRouteSummary(summary);
          form.setValue("walkRouteSummary", summary);
        }
      } catch (error) {
        console.error("Failed to fetch route:", error);
        toast.error("경로를 불러오는 데 실패했습니다.");
      } finally {
        setIsRouteFetching(false);
      }
    },
    [transportCandidates, form]
  );

  // 출발/도착 일정 변경 시 자동 조회
  useEffect(() => {
    if (startScheduleId && endScheduleId && transportType) {
      handleFetchRoute(startScheduleId, endScheduleId, transportType);
    }
  }, [startScheduleId, endScheduleId, transportType, handleFetchRoute]);

  // 출발 일정 선택 시 시작 시간 자동 설정
  useEffect(() => {
    if (startScheduleId) {
      const startSchedule = transportCandidates.find((s) => String(s.id) === startScheduleId);
      if (startSchedule) {
        const endTime = getScheduleEndTime(startSchedule);
        form.setValue("startAt", endTime);
      }
    }
  }, [startScheduleId, transportCandidates, form]);

  // 경로 데이터 변경 시 부모에게 전달
  useEffect(() => {
    onRouteDataChange({
      routeData,
      selectedRoute,
      carRouteSummary,
      walkRouteSummary,
    });
  }, [routeData, selectedRoute, carRouteSummary, walkRouteSummary, onRouteDataChange]);

  if (transportCandidates.length < 2) {
    return (
      <p className="text-destructive text-xs">
        이동 경로를 지정하려면 최소 두 개의 일정이 필요합니다.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* 출발/도착 선택 */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="startScheduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                출발 일정<span className="text-red-500">*</span>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-(--radix-form-item-width) overflow-hidden *:data-[slot=select-value]:*:w-full">
                    <SelectValue placeholder="출발 일정 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transportCandidates.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <span className="overflow-hidden text-ellipsis">{item.title}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endScheduleId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                도착 일정<span className="text-red-500">*</span>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-(--radix-form-item-width) overflow-hidden *:data-[slot=select-value]:*:w-full">
                    <SelectValue placeholder="도착 일정 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-(--radix-form-item-width)">
                  {transportCandidates.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <div className="flex items-center pr-2">
                        <span className="block max-w-full truncate">{item.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 이동 수단 선택 */}
      <FormField
        control={form.control}
        name="transportType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              이동 수단<span className="text-red-500">*</span>
            </FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="이동 수단을 선택하세요" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="PUBLIC_TRANSPORT">대중교통</SelectItem>
                <SelectItem value="CAR">자동차</SelectItem>
                <SelectItem value="WALK">도보</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 로딩 상태 */}
      {isRouteFetching && (
        <div className="text-muted-foreground flex items-center justify-center py-4 text-sm">
          <Loader2 className="mr-2 size-4 animate-spin" /> 경로 검색 중...
        </div>
      )}

      {/* 경로 없음 */}
      {!isRouteFetching &&
        startScheduleId &&
        endScheduleId &&
        routeData.length === 0 &&
        !carRouteSummary &&
        !walkRouteSummary && (
          <div className="border-input text-muted-foreground flex items-center justify-center rounded-md border py-4 text-sm">
            선택한 출발지와 도착지 사이의 경로 정보가 없습니다.
          </div>
        )}

      {/* 대중교통 경로 목록 */}
      {!isRouteFetching && routeData.length > 0 && (
        <TransitRouteList
          itineraries={routeData}
          selectedIndex={selectedRouteIndex}
          onSelect={(route, index) => {
            setSelectedRoute(route);
            setSelectedRouteIndex(index);
            form.setValue("selectedRouteIndex", index);
          }}
        />
      )}

      {/* 자동차 요약 */}
      {!isRouteFetching && transportType === "CAR" && carRouteSummary && (
        <div className="space-y-3 rounded-md border p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">경로 요약</span>
            <span className="text-muted-foreground text-xs">카카오맵 제공</span>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-muted-foreground text-xs">예상 시간</p>
              <p className="font-medium">{Math.ceil(carRouteSummary.duration / 60)}분</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">거리</p>
              <p className="font-medium">{(carRouteSummary.distance / 1000).toFixed(1)}km</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">택시 요금</p>
              <p className="font-medium">
                {carRouteSummary.fare?.taxi !== undefined
                  ? `${carRouteSummary.fare.taxi.toLocaleString()}원`
                  : "정보 없음"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 도보 요약 */}
      {!isRouteFetching && transportType === "WALK" && walkRouteSummary && (
        <div className="space-y-3 rounded-md border p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">경로 요약</span>
            <span className="text-muted-foreground text-xs">TMap 제공</span>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground text-xs">예상 시간</p>
              <p className="font-medium">{Math.ceil(walkRouteSummary.totalTime / 60)}분</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">거리</p>
              <p className="font-medium">{(walkRouteSummary.totalDistance / 1000).toFixed(1)}km</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
