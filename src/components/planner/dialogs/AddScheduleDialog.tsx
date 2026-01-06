"use client";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarFrontIcon, UtensilsIcon, CoffeeIcon, Loader2, NotepadTextIcon } from "lucide-react";
import SearchPlaces from "../sidebar/SearchPlaces";
import { createPlanSchedule } from "@/lib/api/planner/schedule.client";
import {
  ConcertCoords,
  Itinerary,
  KakaoMapSummary,
  ScheduleDetail,
  ScheduleType,
  SearchPlace,
  TMapWalkRoute,
  TransportType,
} from "@/types/planner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatTimeToKoreanAMPM, toMinutePrecision } from "@/utils/helpers/formatters";
import { cn } from "@/lib/utils";
import {
  getCarRouteSummaryByKakaoMap,
  getTransitRouteDetailsByTmap,
  getWalkRouteByTmap,
} from "@/lib/api/planner/transport.client";
import TransitRouteList from "../timeline/TransitRouteList";
import { Separator } from "@/components/ui/separator";

// 경로 정보 조회 실패 시 사용할 기본 소요 시간 (분)
const DEFAULT_CAR_DURATION_MINUTES = 60; // 자동차: 평균 도심 이동 시간 고려
const DEFAULT_WALK_DURATION_MINUTES = 30; // 도보: 평균 도보 이동 시간 고려

// 시간에 분 단위 더하기
function addMinutesToTime(timeStr: string, minutes: number): string {
  const [hours, mins] = timeStr.split(":").map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
}

// 스케줄의 종료 시간 계산
function getScheduleEndTime(schedule: ScheduleDetail): string {
  return addMinutesToTime(schedule.startAt.substring(0, 5), schedule.duration);
}

interface AddScheduleDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultStartTime?: string;
  defaultCoords?: ConcertCoords;
  schedules?: ScheduleDetail[];
}

export default function AddScheduleDialog({
  planId,
  open,
  onOpenChange,
  defaultStartTime,
  defaultCoords,
  schedules = [],
}: AddScheduleDialogProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();
  const [scheduleType, setScheduleType] = useState<ScheduleType>("MEAL");

  // 장소 관련 state
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [coords, setCoords] = useState<{ lon?: number; lat?: number } | null>(null);
  const [isPlaceSelected, setIsPlaceSelected] = useState(false);

  // 이동 일정 관련 state
  const transportCandidates = useMemo(
    () => schedules.filter((s) => s.id && s.scheduleType !== "TRANSPORT" && s.location),
    [schedules]
  );
  const [startScheduleId, setStartScheduleId] = useState<string | undefined>(undefined);
  const [endScheduleId, setEndScheduleId] = useState<string | undefined>(undefined);
  const [isRouteFetching, setIsRouteFetching] = useState(false);

  // 경로 데이터 state
  const [transportType, setTransportType] = useState<TransportType | null>(null);
  const [routeData, setRouteData] = useState<Itinerary[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Itinerary | null>(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
  const [carRouteSummary, setCarRouteSummary] = useState<KakaoMapSummary | null>(null);
  const [walkRouteSummary, setWalkRouteSummary] = useState<TMapWalkRoute | null>(null);

  // 일반 일정(비TRANSPORT) 선택지 - 콘서트 제외, 모든 타입의 일정들
  const regularScheduleCandidates = useMemo(
    () =>
      schedules.filter(
        (s) => s.id && s.scheduleType !== "TRANSPORT" && !s.isMainEvent && s.location
      ),
    [schedules]
  );

  const [selectedRegularScheduleId, setSelectedRegularScheduleId] = useState<string | undefined>(
    undefined
  );

  // 시간 범위 계산
  const timeRange = useMemo(() => {
    // 시간별로 정렬된 일정들 (공연 이벤트 제외)
    const sortedSchedules = schedules
      .filter((s) => s.startAt && !s.isMainEvent)
      .sort((a, b) => a.startAt.localeCompare(b.startAt));

    let minTime: string | undefined;
    let maxTime: string | undefined;

    // 현재 선택된 시간이 없으면 전체 범위를 허용
    if (sortedSchedules.length > 0) {
      minTime = "00:00"; // 첫 번째 일정 시작 시간
      maxTime = "23:59"; // 마지막 일정 끝나는 시간
    }

    return { minTime, maxTime };
  }, [schedules]);

  // 스케줄 타입 변경 시 초기화
  useEffect(() => {
    setIsPlaceSelected(false);
    setPlaceName("");
    setPlaceAddress("");
    setCoords(null);
    setRouteData([]);
    setSelectedRoute(null);
    setSelectedRouteIndex(null);
    setCarRouteSummary(null);
    setWalkRouteSummary(null);
    setSelectedRegularScheduleId(undefined);
    setTransportType(null);
    // 출발/도착은 항상 수동 선택으로 초기화 (자동 선택 시 바로 호출되는 문제 방지)
    setStartScheduleId(undefined);
    setEndScheduleId(undefined);
  }, [scheduleType, transportCandidates]);

  // 다이얼로그가 닫히면 모든 state 초기화
  useEffect(() => {
    if (!open) {
      setScheduleType("MEAL");
      setIsPlaceSelected(false);
      setPlaceName("");
      setPlaceAddress("");
      setCoords(null);
      setRouteData([]);
      setSelectedRoute(null);
      setSelectedRouteIndex(null);
      setCarRouteSummary(null);
      setWalkRouteSummary(null);
      setSelectedRegularScheduleId(undefined);
      setStartScheduleId(undefined);
      setEndScheduleId(undefined);
      setTransportType(null);

      // 폼 입력값도 초기화
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [open]);

  // 다이얼로그가 다시 열릴 때도 이동수단 기본값
  useEffect(() => {
    if (open) {
      // 경로/선택/출발/도착 모두 초기화
      setRouteData([]);
      setSelectedRoute(null);
      setSelectedRouteIndex(null);
      setCarRouteSummary(null);
      setWalkRouteSummary(null);
      setStartScheduleId(undefined);
      setEndScheduleId(undefined);
      setTransportType("PUBLIC_TRANSPORT");
    }
  }, [open]);

  // 길찾기 API 호출 핸들러
  const handleFetchRoute = useCallback(
    async (startId: string, endId: string, currentTransportType: TransportType) => {
      setIsRouteFetching(true);
      setRouteData([]); // 이전 결과 초기화
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
          setRouteData(data?.metaData?.plan.itineraries || []);
        } else if (currentTransportType === "CAR") {
          const summary = await getCarRouteSummaryByKakaoMap({
            startX: startSchedule.locationLon!,
            startY: startSchedule.locationLat!,
            endX: endSchedule.locationLon!,
            endY: endSchedule.locationLat!,
          });
          setRouteData([]);
          setCarRouteSummary(summary);
        } else if (currentTransportType === "WALK") {
          const summary = await getWalkRouteByTmap({
            startX: startSchedule.locationLon!,
            startY: startSchedule.locationLat!,
            endX: endSchedule.locationLon!,
            endY: endSchedule.locationLat!,
          });
          setRouteData([]);
          setWalkRouteSummary(summary);
        } else {
          setRouteData([]);
        }
      } catch (error) {
        console.error("Failed to fetch route:", error);
        toast.error("경로를 불러오는 데 실패했습니다.");
      } finally {
        setIsRouteFetching(false);
      }
    },
    [transportCandidates]
  );

  // 이동 수단 변경 핸들러
  const handleChangeTransportType = (value: TransportType) => {
    setTransportType(value);
    setRouteData([]);
    setSelectedRoute(null);
    setSelectedRouteIndex(null);
    setCarRouteSummary(null);
    setWalkRouteSummary(null);
    if (scheduleType === "TRANSPORT" && startScheduleId && endScheduleId) {
      handleFetchRoute(startScheduleId, endScheduleId, value);
    }
  };

  // 장소 선택 핸들러
  const handlePlaceSelect = (place: SearchPlace) => {
    setPlaceName(place.place_name || place.address_name);
    setPlaceAddress(place.road_address_name || place.address_name || "");
    setCoords({ lat: place.y, lon: place.x });
    setIsPlaceSelected(true);
  };

  // 장소 다시 검색 핸들러
  const handlePlaceReset = () => {
    setIsPlaceSelected(false);
    setPlaceName("");
    setPlaceAddress("");
    setCoords(null);
  };

  // 일정 타입 변경 핸들러
  const handleScheduleTypeChange = (value: string) => {
    if (value === "new") {
      setSelectedRegularScheduleId(undefined);
      setIsPlaceSelected(false);
      setPlaceName("");
      setPlaceAddress("");
      setCoords(null);
    } else {
      setSelectedRegularScheduleId(value);
    }
  };

  // 출발/도착 일정 변경 시 자동 조회
  useEffect(() => {
    if (scheduleType === "TRANSPORT" && startScheduleId && endScheduleId && transportType) {
      handleFetchRoute(startScheduleId, endScheduleId, transportType);
    }
  }, [startScheduleId, endScheduleId, scheduleType, transportType, handleFetchRoute]);

  // 출발 일정이 선택되면 자동으로 시작 시간 설정
  useEffect(() => {
    if (scheduleType === "TRANSPORT" && startScheduleId && formRef.current) {
      const startSchedule = transportCandidates.find((s) => String(s.id) === startScheduleId);
      if (startSchedule) {
        // 출발 일정의 끝나는 시간을 시작 시간으로 설정
        const endTime = getScheduleEndTime(startSchedule);
        const timeInput = formRef.current.querySelector(
          'input[name="scheduleStartTime"]'
        ) as HTMLInputElement;
        if (timeInput) {
          timeInput.value = endTime;
        }
      }
    }
  }, [startScheduleId, scheduleType, transportCandidates]);

  // 기존 일정이 선택되면 시작 시간만 자동 설정
  useEffect(() => {
    if (selectedRegularScheduleId && formRef.current) {
      const selectedSchedule = regularScheduleCandidates.find(
        (s) => String(s.id) === selectedRegularScheduleId
      );
      if (selectedSchedule) {
        // 시작 시간 설정 (선택한 일정의 끝나는 시간)
        const endTime = getScheduleEndTime(selectedSchedule);
        const timeInput = formRef.current.querySelector(
          'input[name="scheduleStartTime"]'
        ) as HTMLInputElement;
        if (timeInput) {
          timeInput.value = endTime;
        }
      }
    }
  }, [selectedRegularScheduleId, regularScheduleCandidates]);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 데이터 추출
    const formData = new FormData(e.currentTarget);
    const title = formData.get("scheduleTitle") as string;
    const startTime = formData.get("scheduleStartTime") as string;
    const parsedDuration = Number(formData.get("scheduleDuration"));
    const duration = Number.isFinite(parsedDuration) ? parsedDuration : 0;
    const transportType = formData.get("transportType") as TransportType | null;
    const notes = formData.get("scheduleNotes") as string;
    const estimatedCost = 0; // TODO : 비용 입력 필드 추가 시 반영

    // 시간 형식 정규화
    const normalizedStartAt = startTime ? `${toMinutePrecision(startTime)}:00` : "";

    // 이동 타입일 때 검증
    if (scheduleType === "TRANSPORT") {
      if (transportCandidates.length < 2) {
        toast.error("출발/도착 일정을 먼저 추가해주세요.");
        return;
      }
      if (!startScheduleId || !endScheduleId) {
        toast.error("출발/도착 일정을 선택해주세요.");
        return;
      }

      // 대중교통인데 경로 선택 안 했으면 경고
      if (!transportType) {
        toast.error("이동 수단을 선택해주세요.");
        return;
      }

      if (transportType === "PUBLIC_TRANSPORT" && !selectedRoute && routeData.length > 0) {
        toast.error("추천 경로 중 하나를 선택해주세요.");
        return;
      }
    }

    // 일정 데이터 구성
    const selectedRouteCost =
      scheduleType === "TRANSPORT" && selectedRoute?.fare?.regular?.totalFare
        ? selectedRoute.fare.regular.totalFare
        : undefined;

    let scheduleData: ScheduleDetail = {
      scheduleType,
      title,
      duration,
      location: [placeAddress, placeName].filter(Boolean).join(", "),
      locationLat: coords?.lat,
      locationLon: coords?.lon,
      startAt: normalizedStartAt,
      details: notes,
      transportType: scheduleType === "TRANSPORT" ? (transportType ?? undefined) : undefined,
      estimatedCost: selectedRouteCost ?? estimatedCost,
    };

    // 이동 타입일 때 위치 정보 덮어쓰기
    if (scheduleType === "TRANSPORT") {
      const startSchedule = transportCandidates.find((s) => String(s.id) === startScheduleId);
      const endSchedule = transportCandidates.find((s) => String(s.id) === endScheduleId);

      if (startSchedule && endSchedule) {
        scheduleData = {
          ...scheduleData,
          location: `${startSchedule.title || "출발"} -> ${endSchedule.title || "도착"}`,
          startPlaceLat: startSchedule.locationLat,
          startPlaceLon: startSchedule.locationLon,
          endPlaceLat: endSchedule.locationLat,
          endPlaceLon: endSchedule.locationLon,
          startAt: startSchedule.startAt, // 이동 시작 시간은 출발 일정 시간? (로직에 따라 조정 필요)
        };
      }

      if (selectedRoute) {
        const routeDurationMinutes = Math.ceil(selectedRoute.totalTime / 60);
        scheduleData = {
          ...scheduleData,
          duration: routeDurationMinutes,
          estimatedCost: selectedRouteCost ?? estimatedCost,
          distance: selectedRoute.totalDistance,
          transportRoute: {
            totalTime: selectedRoute.totalTime,
            totalDistance: selectedRoute.totalDistance,
            totalWalkTime: selectedRoute.totalWalkTime ?? 0,
            totalWalkDistance: selectedRoute.totalWalkDistance ?? 0,
            transferCount: selectedRoute.transferCount,
            leg: selectedRoute.legs || [],
            fare: {
              taxi: selectedRoute.fare?.regular?.totalFare,
            },
          },
        };
      } else if (transportType === "CAR") {
        // CAR: 요약 정보가 있으면 사용, 없으면 기본값 설정
        if (carRouteSummary) {
          const carDurationMinutes = Math.ceil(carRouteSummary.duration / 60);
          scheduleData = {
            ...scheduleData,
            duration: carDurationMinutes,
            estimatedCost: carRouteSummary.fare?.taxi ?? estimatedCost,
            distance: carRouteSummary.distance,
            transportRoute: {
              totalTime: carRouteSummary.duration,
              totalDistance: carRouteSummary.distance,
              totalWalkTime: 0,
              totalWalkDistance: 0,
              transferCount: 0,
              leg: [],
              fare: {
                taxi: carRouteSummary.fare?.taxi,
              },
            },
          };
        } else {
          // 요약 정보 없을 때 기본값 설정
          scheduleData = {
            ...scheduleData,
            duration: DEFAULT_CAR_DURATION_MINUTES,
            transportRoute: {
              totalTime: DEFAULT_CAR_DURATION_MINUTES * 60,
              totalDistance: 0,
              totalWalkTime: 0,
              totalWalkDistance: 0,
              transferCount: 0,
              leg: [],
              fare: {
                taxi: undefined,
              },
            },
          };
        }
      } else if (transportType === "WALK") {
        // WALK: 요약 정보가 있으면 사용, 없으면 기본값 설정
        if (walkRouteSummary) {
          const walkDurationMinutes = Math.ceil(walkRouteSummary.totalTime / 60);
          scheduleData = {
            ...scheduleData,
            duration: walkDurationMinutes,
            distance: walkRouteSummary.totalDistance,
            transportRoute: {
              totalTime: walkRouteSummary.totalTime,
              totalDistance: walkRouteSummary.totalDistance,
              totalWalkTime: walkRouteSummary.totalTime,
              totalWalkDistance: walkRouteSummary.totalDistance,
              transferCount: 0,
              leg: [],
              fare: {
                taxi: undefined,
              },
            },
          };
        } else {
          // 요약 정보 없을 때 기본값 설정
          scheduleData = {
            ...scheduleData,
            duration: DEFAULT_WALK_DURATION_MINUTES,
            transportRoute: {
              totalTime: DEFAULT_WALK_DURATION_MINUTES * 60,
              totalDistance: 0,
              totalWalkTime: DEFAULT_WALK_DURATION_MINUTES * 60,
              totalWalkDistance: 0,
              transferCount: 0,
              leg: [],
              fare: {
                taxi: undefined,
              },
            },
          };
        }
      }
    }

    startTransition(async () => {
      try {
        await createPlanSchedule({
          planId,
          scheduleData,
        });
        toast.success("일정이 성공적으로 생성되었습니다.");
        onOpenChange(false);
        router.refresh();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "일정 생성에 실패했습니다. 다시 시도해주세요.";
        toast.error(errorMessage);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95%] overflow-hidden sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>새로운 일정 추가</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} ref={formRef}>
          <FieldGroup className="max-h-[70vh] overflow-y-auto p-4">
            {/* 일정 타입 */}
            <Field>
              <Label className="gap-0.5">
                어떤 일정인가요?<span className="text-red-500">*</span>
              </Label>
              <ToggleGroup
                type="single"
                variant="outline"
                value={scheduleType}
                onValueChange={(val: ScheduleType) => val && setScheduleType(val)}
              >
                <ToggleGroupItem value="MEAL" aria-label="식사" className="flex-1 gap-2">
                  <UtensilsIcon className="size-4" />
                  <span>식사</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="WAITING" aria-label="카페" className="flex-1 gap-2">
                  <CoffeeIcon className="size-4" />
                  <span>카페</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="TRANSPORT" aria-label="이동" className="flex-1 gap-2">
                  <CarFrontIcon className="size-4" />
                  <span>이동</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="ACTIVITY" aria-label="기타" className="flex-1 gap-2">
                  <NotepadTextIcon className="size-4" />
                  <span>기타</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
            {/* 장소 검색 */}
            {scheduleType !== "TRANSPORT" && (
              <>
                <Field>
                  <Label htmlFor="scheduleLocation">일정 선택</Label>
                  {/* 기존 일정이 있으면 선택 옵션 제공 */}
                  {regularScheduleCandidates.length > 0 && (
                    <Select
                      value={selectedRegularScheduleId || "new"}
                      onValueChange={(value) => handleScheduleTypeChange(value)}
                      name="selectedSchedule"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="이전 일정 이어서 시작" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">직접 시간 설정</SelectItem>
                        {regularScheduleCandidates.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            <span>
                              {item.title} ({formatTimeToKoreanAMPM(item.startAt)}, {item.duration}
                              분)
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="scheduleLocation" className="gap-0.5">
                    장소
                    {scheduleType === "MEAL" || scheduleType === "WAITING" ? (
                      <span className="text-red-500">*</span>
                    ) : null}
                  </Label>
                  <div className={!isPlaceSelected ? "block" : "hidden"}>
                    <SearchPlaces
                      placeholder="식당, 카페, 관광지 검색..."
                      onSelect={handlePlaceSelect}
                      scheduleType={scheduleType}
                      defaultCoords={defaultCoords}
                    />
                  </div>
                  <div
                    className={cn(
                      "border-input dark:bg-input/30 items-center justify-between rounded-md border p-3",
                      isPlaceSelected ? "flex" : "hidden"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">{placeName}</span>
                        <span className="text-xs text-gray-500">{placeAddress}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={handlePlaceReset}
                      className="h-8 text-xs"
                      type="button"
                    >
                      다시 검색
                    </Button>
                  </div>
                </Field>
              </>
            )}
            {/* 일정 제목 */}
            <Field>
              <Label htmlFor="scheduleTitle" className="gap-0.5">
                일정 이름<span className="text-red-500">*</span>
              </Label>
              <Input
                id="scheduleTitle"
                name="scheduleTitle"
                placeholder={placeName || "예: 점심 식사, 굿즈 구매"}
                defaultValue={placeName} // 장소명이 곧 제목이 되도록
              />
            </Field>

            {/* 시간 설정 (이동 타입 제외) */}
            {scheduleType !== "TRANSPORT" && (
              <div className="flex gap-4">
                <Field className="flex-1">
                  <Label htmlFor="scheduleStartTime" className="gap-0.5">
                    시작 시간<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="time"
                    id="scheduleStartTime"
                    name="scheduleStartTime"
                    step="60"
                    defaultValue={toMinutePrecision(defaultStartTime) || "12:00"}
                    min={timeRange.minTime || "00:00"}
                    max={timeRange.maxTime || "23:59"}
                  />
                </Field>
                <Field className="flex-1">
                  <Label htmlFor="scheduleDuration" className="gap-0.5">
                    예상 소요시간
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select name="scheduleDuration" defaultValue="60">
                    <SelectTrigger>
                      <SelectValue placeholder="소요 시간" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30분</SelectItem>
                      <SelectItem value="60">1시간</SelectItem>
                      <SelectItem value="90">1시간 30분</SelectItem>
                      <SelectItem value="120">2시간</SelectItem>
                      <SelectItem value="150">2시간 30분</SelectItem>
                      <SelectItem value="180">3시간</SelectItem>
                      <SelectItem value="210">3시간 30분</SelectItem>
                      <SelectItem value="240">4시간</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            )}

            {/* 이동 수단 상세 (이동 타입일 때만 노출) */}
            {scheduleType === "TRANSPORT" && (
              <>
                {transportCandidates.length < 2 ? (
                  <p className="text-sm text-red-500">
                    이동 경로를 지정하려면 최소 두 개의 일정이 필요합니다.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <Label htmlFor="startSchedule" className="gap-0.5">
                        출발 일정<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={startScheduleId}
                        onValueChange={setStartScheduleId}
                        name="startSchedule"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="출발 일정 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {transportCandidates.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              <span className="overflow-hidden text-ellipsis">{item.title}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <Label htmlFor="endSchedule" className="gap-0.5">
                        도착 일정<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={endScheduleId}
                        onValueChange={setEndScheduleId}
                        name="endSchedule"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="도착 일정 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {transportCandidates.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              <span className="overflow-hidden text-ellipsis">{item.title}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                )}

                <div className="space-y-2">
                  <Field>
                    <Label htmlFor="transportType" className="gap-0.5">
                      이동 수단<span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="transportType"
                      value={transportType ?? undefined}
                      onValueChange={(val) => handleChangeTransportType(val as TransportType)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="이동 수단을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PUBLIC_TRANSPORT">대중교통</SelectItem>
                        <SelectItem value="CAR">자동차</SelectItem>
                        <SelectItem value="WALK">도보</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  {/* 로딩 중 표시 */}
                  {isRouteFetching && (
                    <div className="text-muted-foreground flex items-center justify-center py-4 text-sm">
                      <Loader2 className="mr-2 size-4 animate-spin" /> 경로 검색 중...
                    </div>
                  )}

                  {/* 최적 경로 */}
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
                  {!isRouteFetching && routeData.length > 0 && (
                    <TransitRouteList
                      itineraries={routeData}
                      selectedIndex={selectedRouteIndex}
                      onSelect={(route, index) => {
                        setSelectedRoute(route);
                        setSelectedRouteIndex(index);
                      }}
                    />
                  )}

                  {/* 자동차 요약 정보 (선택 없이 표시만) */}
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
                          <p className="font-medium">
                            {Math.ceil(carRouteSummary.duration / 60)}분
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">거리</p>
                          <p className="font-medium">
                            {(carRouteSummary.distance / 1000).toFixed(1)}km
                          </p>
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

                  {/* 도보 요약 정보 (선택 없이 표시만) */}
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
                          <p className="font-medium">
                            {Math.ceil(walkRouteSummary.totalTime / 60)}분
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">거리</p>
                          <p className="font-medium">
                            {(walkRouteSummary.totalDistance / 1000).toFixed(1)}km
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 메모 */}
            <Field>
              <Label htmlFor="scheduleNotes" className="gap-0.5">
                상세 정보<span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="scheduleNotes"
                name="scheduleNotes"
                placeholder={
                  scheduleType === "MEAL"
                    ? "메뉴, 예산 등 식사 관련 메모를 남겨보세요."
                    : scheduleType === "WAITING"
                      ? "원하는 카페 분위기나 메뉴 등을 메모해보세요."
                      : scheduleType === "ACTIVITY"
                        ? "활동에 필요한 준비물이나 주의사항을 기록해보세요."
                        : "이동 시 주의할 사항이나 참고할 내용을 메모해보세요."
                }
                className="h-20 resize-none"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button" disabled={isPending}>
                취소
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  등록 중...
                </>
              ) : (
                "일정 등록"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
