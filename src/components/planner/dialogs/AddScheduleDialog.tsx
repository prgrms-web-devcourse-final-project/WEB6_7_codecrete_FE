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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { CarFrontIcon, UtensilsIcon, StarIcon, CoffeeIcon, Loader2 } from "lucide-react"; // 아이콘 정리
import SearchPlaces from "../sidebar/SearchPlaces";
import { createPlanSchedule } from "@/lib/api/planner/schedule.client";
import {
  ConcertCoords,
  Itinerary,
  ScheduleDetail,
  ScheduleType,
  SearchPlace,
  TransportType,
} from "@/types/planner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toMinutePrecision } from "@/utils/helpers/formatters";
import { cn } from "@/lib/utils";
import { getTransitRouteDetailsByTmap } from "@/lib/api/planner/transport.client";
import TransitRouteList from "../timeline/TransitRouteList";

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
  const [coords, setCoords] = useState<{ lat?: number; lon?: number } | null>(null);
  const [isPlaceSelected, setIsPlaceSelected] = useState(false);

  // 이동 일정 관련 state
  const transportCandidates = useMemo(
    () => schedules.filter((s) => s.id && s.scheduleType !== "TRANSPORT"),
    [schedules]
  );
  const [startScheduleId, setStartScheduleId] = useState<string | undefined>(undefined);
  const [endScheduleId, setEndScheduleId] = useState<string | undefined>(undefined);
  const [isRouteFetching, setIsRouteFetching] = useState(false);

  // 경로 데이터 state
  const [transportData, setRouteData] = useState<Itinerary[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Itinerary | null>(null);

  // 스케줄 타입 변경 시 초기화
  useEffect(() => {
    setIsPlaceSelected(false);
    setPlaceName("");
    setPlaceAddress("");
    setCoords(null);
    setRouteData([]);
    setSelectedRoute(null);

    if (scheduleType !== "TRANSPORT") {
      setStartScheduleId(undefined);
      setEndScheduleId(undefined);
      return;
    }
    // 이동 타입이면 기본값으로 첫 번째, 두 번째 일정 선택
    if (transportCandidates.length > 0) {
      setStartScheduleId(String(transportCandidates[0].id));
      if (transportCandidates[1]?.id) {
        setEndScheduleId(String(transportCandidates[1].id));
      }
    }
  }, [scheduleType, transportCandidates]);

  // 길찾기 API 호출 핸들러
  const handleFetchRoute = useCallback(
    async (startId: string, endId: string) => {
      setIsRouteFetching(true);
      setRouteData([]); // 이전 결과 초기화
      setSelectedRoute(null);

      try {
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const transportType = formData.get("transportType") as TransportType;

        const startSchedule = transportCandidates.find((s) => String(s.id) === startId);
        const endSchedule = transportCandidates.find((s) => String(s.id) === endId);

        if (!startSchedule || !endSchedule) {
          toast.error("출발/도착 일정 정보를 불러올 수 없습니다.");
          return;
        }

        if (transportType === "PUBLIC_TRANSPORT") {
          const data = await getTransitRouteDetailsByTmap({
            startX: startSchedule.locationLon!,
            startY: startSchedule.locationLat!,
            endX: endSchedule.locationLon!,
            endY: endSchedule.locationLat!,
          });
          setRouteData(data.metaData.plan.itineraries || []);
        } else {
          // TODO: 자동차(CAR), 도보(WALK) 로직 추가
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

  // 출발/도착 일정 변경 시 자동 조회
  useEffect(() => {
    if (scheduleType === "TRANSPORT" && startScheduleId && endScheduleId) {
      handleFetchRoute(startScheduleId, endScheduleId);
    }
  }, [startScheduleId, endScheduleId, scheduleType, handleFetchRoute]);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 데이터 추출
    const formData = new FormData(e.currentTarget);
    const title = formData.get("scheduleTitle") as string;
    const startTime = formData.get("scheduleStartTime") as string;
    const parsedDuration = Number(formData.get("scheduleDuration"));
    const duration = Number.isFinite(parsedDuration) ? parsedDuration : 0;
    const transportType = formData.get("transportType") as TransportType;
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
      if (transportType === "PUBLIC_TRANSPORT" && !selectedRoute && transportData.length > 0) {
        toast.error("추천 경로 중 하나를 선택해주세요.");
        return;
      }

      // 선택된 경로가 있다면 소요시간 및 상세정보 업데이트
      if (selectedRoute) {
      }
    }

    // 일정 데이터 구성
    let scheduleData: ScheduleDetail = {
      scheduleType,
      title,
      duration,
      location: [placeAddress, placeName].filter(Boolean).join(", "),
      locationLat: coords?.lat,
      locationLon: coords?.lon,
      startAt: normalizedStartAt,
      details: notes,
      transportType: scheduleType === "TRANSPORT" ? transportType : undefined,
      estimatedCost,
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
          // duration은 위에서 이미 계산됨
        };
      }
    }

    startTransition(async () => {
      try {
        await createPlanSchedule({
          planId,
          scheduleData,
        });
        toast.success("일정이 성공적으로 생성되었습니다.");
      } catch (error) {
        console.error("Error creating schedule:", error);
        toast.error("일정 생성에 실패했습니다. 다시 시도해주세요.");
      } finally {
        router.refresh();
        onOpenChange(false);
      }
    });
  };

  // 장소 선택 핸들러
  const handlePlaceSelect = (place: SearchPlace) => {
    setPlaceName(place.place_name || place.address_name);
    setPlaceAddress(place.road_address_name || place.address_name || "");
    setCoords({ lat: place.y, lon: place.x });
    setIsPlaceSelected(true);
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
              <FieldLabel>어떤 일정인가요?</FieldLabel>
              <ToggleGroup
                type="single"
                variant="outline"
                value={scheduleType}
                onValueChange={(val: ScheduleType) => val && setScheduleType(val)}
              >
                <ToggleGroupItem value="MEAL" aria-label="식사" className="flex gap-2">
                  <UtensilsIcon className="size-4" />
                  <span>식사</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="WAITING" aria-label="카페" className="flex gap-2">
                  <CoffeeIcon className="size-4" />
                  <span>카페</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="ACTIVITY" aria-label="활동" className="flex gap-2">
                  <StarIcon className="size-4" />
                  <span>관람 / 활동</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="TRANSPORT" aria-label="이동" className="flex gap-2">
                  <CarFrontIcon className="size-4" />
                  <span>이동</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
            {/* 장소 검색 */}
            {scheduleType !== "TRANSPORT" && (
              <Field>
                <Label htmlFor="scheduleLocation">장소</Label>
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
                    onClick={() => {
                      setIsPlaceSelected(false);
                      setPlaceName("");
                      setPlaceAddress("");
                      setCoords(null);
                    }}
                    className="h-8 text-xs"
                    type="button"
                  >
                    다시 검색
                  </Button>
                </div>
              </Field>
            )}
            {/* 일정 제목 */}
            <Field>
              <Label htmlFor="scheduleTitle">일정 이름</Label>
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
                  <Label htmlFor="scheduleStartTime">시작 시간</Label>
                  <Input
                    type="time"
                    id="scheduleStartTime"
                    name="scheduleStartTime"
                    step="60"
                    defaultValue={toMinutePrecision(defaultStartTime) || "12:00"}
                  />
                </Field>
                <Field className="flex-1">
                  <Label htmlFor="scheduleDuration">예상 소요시간 (분)</Label>
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
            {/* 5. 이동 수단 상세 (이동 타입일 때) */}
            {scheduleType === "TRANSPORT" && (
              <>
                {transportCandidates.length < 2 ? (
                  <p className="text-sm text-red-500">
                    이동 경로를 지정하려면 최소 두 개의 일정이 필요합니다.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <Label htmlFor="startSchedule">출발</Label>
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
                      <Label htmlFor="endSchedule">도착</Label>
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
                    <Label htmlFor="transportType">이동 수단</Label>
                    <Select name="transportType" defaultValue="PUBLIC_TRANSPORT">
                      <SelectTrigger>
                        <SelectValue />
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
                  {!isRouteFetching && transportData.length > 0 && (
                    <TransitRouteList itineraries={transportData} onSelect={setSelectedRoute} />
                  )}
                </div>
              </>
            )}

            {/* 6. 메모 */}
            <Field>
              <Label htmlFor="scheduleNotes">메모 (선택)</Label>
              <Textarea
                id="scheduleNotes"
                name="scheduleNotes"
                placeholder="메뉴, 예약 정보 등을 적어두세요."
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
