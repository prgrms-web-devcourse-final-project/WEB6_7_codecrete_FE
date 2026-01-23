"use client";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ControllerRenderProps,
  useForm,
  UseFormReturn,
  useWatch,
  type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UtensilsIcon, CoffeeIcon, Loader2, NotepadTextIcon } from "lucide-react";

import { PlaceSelector } from "./fields/PlaceSelector";
import { createPlanSchedule } from "@/lib/api/planner/schedule.client";
import {
  scheduleFormSchema,
  type ScheduleFormData,
  getDefaultScheduleValues,
} from "@/lib/zod/schedule.schema";
import { toMinutePrecision, formatTimeToKoreanAMPM } from "@/utils/helpers/formatters";
import {
  calculateNextScheduleStartTime,
  getScheduleEndTime,
  transformBasicSchedule,
} from "@/utils/helpers/scheduleTransform";
import { ConcertCoords, ScheduleDetail, ScheduleType } from "@/types/planner";
import {
  getTransitRouteDetailsByTmap,
  getWalkRouteByTmap,
} from "@/lib/api/planner/transport.client";
import { TimeValidationResult, validateScheduleTime } from "@/utils/helpers/scheduleValidation";
import RecommendTimeCard from "./card/RecommendTimeCard";
import { Card } from "@/components/ui/card";

interface AddScheduleDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultStartTime?: string;
  defaultCoords?: ConcertCoords;
  schedules?: ScheduleDetail[];
}

class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly maxSize: number;

  // 최대 사이즈 50으로 기본 설정
  constructor(maxSize: number = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // 최근 사용한 항목으로 갱신
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // 이미 존재하면 삭제
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 최대 크기 초과시 가장 오래된 항목 삭제
    else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
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
  const [isPending, startTransition] = useTransition();
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<ScheduleFormData | null>(null);

  // scheduleType을 별도 state로 관리 (폼 리셋용)
  const [currentScheduleType, setCurrentScheduleType] =
    useState<Exclude<ScheduleType, "TRANSPORT">>("MEAL");

  // 이동 시간 기반 추천 시작 시간
  const [recommendTime, setRecommendTime] = useState<{
    duration: number | null;
    startAt: string | null;
  }>({
    duration: null,
    startAt: null,
  });
  const [isSettingRecommendTime, setIsSettingRecommendTime] = useState(false);

  // API 호출 캐시 (같은 출발지-도착지 조합은 다시 호출하지 않음)
  const routeCacheRef = useRef<LRUCache<string, { duration: number; startAt: string }>>(
    new LRUCache(50) // 최대 50개 경로 캐싱
  );

  // 일반 일정 선택지
  const regularScheduleCandidates = useMemo(
    () => schedules.filter((s) => s.id && s.scheduleType !== "TRANSPORT" && s.location),
    [schedules]
  );

  // 시간 범위 계산
  const timeRange = useMemo(() => {
    const sortedSchedules = schedules
      .filter((s) => s.startAt && !s.isMainEvent)
      .sort((a, b) => a.startAt.localeCompare(b.startAt));

    return {
      minTime: sortedSchedules.length > 0 ? "00:00" : undefined,
      maxTime: sortedSchedules.length > 0 ? "23:59" : undefined,
    };
  }, [schedules]);

  // React Hook Form 초기화
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: getDefaultScheduleValues("MEAL", toMinutePrecision(defaultStartTime)),
    mode: "onSubmit", // 첫 제출 시에만 검증
    reValidateMode: "onChange", // 제출 후에는 입력할 때마다 재검증 (에러 즉시 제거)
    criteriaMode: "all",
    shouldFocusError: false,
  });

  // watch를 사용해서 실시간으로 값 추적
  const selectedScheduleId = useWatch({
    control: form.control,
    name: "selectedRegularScheduleId",
  });
  const currentCoords = useWatch({
    control: form.control,
    name: "coords",
  });
  const startAt = useWatch({
    control: form.control,
    name: "startAt",
  });

  // 시간 변경 시 검증
  const timeValidation: TimeValidationResult = useMemo(() => {
    if (!startAt || !selectedScheduleId || !recommendTime.duration) {
      return { isValid: true, type: "valid" };
    }

    const selectedSchedule = regularScheduleCandidates.find(
      (s) => String(s.id) === selectedScheduleId
    );

    if (!selectedSchedule) {
      return { isValid: true, type: "valid" };
    }

    // 이전 일정과의 시간 검증
    const travelMinutes = Math.ceil(recommendTime.duration / 60);
    return validateScheduleTime(selectedSchedule, startAt, travelMinutes);
  }, [startAt, selectedScheduleId, recommendTime.duration, regularScheduleCandidates]);

  // 초기화 로직
  const resetToInitialState = () => {
    setCurrentScheduleType("MEAL");
    const initialValues = getDefaultScheduleValues("MEAL", toMinutePrecision(defaultStartTime));
    form.reset(initialValues, {
      keepDirty: false,
      keepTouched: false,
      keepIsValid: false,
      keepErrors: false,
    });
  };

  // scheduleType 변경 핸들러
  const handleScheduleTypeChange = (newType: Exclude<ScheduleType, "TRANSPORT">) => {
    setCurrentScheduleType(newType);
    const newValues = getDefaultScheduleValues(newType, toMinutePrecision(defaultStartTime));
    form.reset(newValues, {
      keepDirty: false,
      keepTouched: false,
      keepIsValid: false,
      keepErrors: false,
    });
  };

  // 다이얼로그 열기/닫기 핸들러
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // 열릴 때만 초기화
      resetToInitialState();
    }
    onOpenChange(newOpen);
  };

  // 폼 검증 실패 시 호출
  const onError = (errors: FieldErrors<ScheduleFormData>) => {
    const scheduleType = form.getValues("scheduleType");

    // 타입별 주요 에러 메시지만 토스트로 띄우기
    if (scheduleType === "MEAL" || scheduleType === "WAITING") {
      if ("coords" in errors) {
        toast.error("장소를 선택해주세요");
      }
    } else if (scheduleType === "ACTIVITY" || scheduleType === "OTHER") {
      if ("title" in errors) {
        toast.error("일정 이름을 입력해주세요");
      }
    }
  };

  // 폼 제출
  const onSubmit = async (data: ScheduleFormData) => {
    // 시간 검증 실패시 경고 다이얼로그 표시
    if (!timeValidation.isValid) {
      setPendingFormData(data);
      setShowTimeWarning(true);
      return;
    }

    await submitSchedule(data);
  };

  // 실제 일정 제출 함수
  const submitSchedule = async (data: ScheduleFormData) => {
    startTransition(async () => {
      try {
        const scheduleData = transformBasicSchedule(data);
        await createPlanSchedule({
          planId,
          scheduleData,
        });

        toast.success("일정이 성공적으로 생성되었습니다.");
        handleOpenChange(false);
        router.refresh();
      } catch (error) {
        console.error("Submit error:", error);
        const errorMessage = error instanceof Error ? error.message : "일정 생성에 실패했습니다.";
        toast.error(errorMessage);
      }
    });
  };

  // 이전 일정을 직접 선택할 경우 기본 시작 시간 자동으로 설정
  const handleScheduleChange = (
    value: string,
    field: ControllerRenderProps<ScheduleFormData, "selectedRegularScheduleId">,
    form: UseFormReturn<ScheduleFormData>
  ) => {
    if (value === "new") {
      field.onChange(undefined);
    } else {
      field.onChange(value);
      const selectedSchedule = regularScheduleCandidates.find((s) => String(s.id) === value);
      if (selectedSchedule) {
        const endTime = getScheduleEndTime(selectedSchedule);
        form.setValue("startAt", endTime, { shouldValidate: false });
      }
    }
  };

  // 이전 일정과 이동 장소가 선택된 경우 이동시간을 고려한 추천 시작 시간 계산
  useEffect(() => {
    const calculateRecommendedTime = async () => {
      if (!selectedScheduleId || !currentCoords) {
        setRecommendTime({
          duration: null,
          startAt: null,
        });
        return;
      }

      const selectedSchedule = regularScheduleCandidates.find(
        (s) => String(s.id) === selectedScheduleId
      );

      if (!selectedSchedule?.locationLat || !selectedSchedule?.locationLon) {
        setRecommendTime({
          duration: null,
          startAt: null,
        });
        return;
      }

      // 캐시 키 생성 (출발지-도착지 조합)
      const cacheKey = `${selectedSchedule.locationLat},${selectedSchedule.locationLon}-${currentCoords.lat},${currentCoords.lon}`;

      // 캐시에 있으면 재사용
      const cached = routeCacheRef.current.get(cacheKey);
      if (cached) {
        setRecommendTime(cached);
        return;
      }

      try {
        setIsSettingRecommendTime(true);
        let duration: number;

        const transitRes = await getTransitRouteDetailsByTmap({
          startX: selectedSchedule.locationLon,
          startY: selectedSchedule.locationLat,
          endX: currentCoords.lon,
          endY: currentCoords.lat,
        });

        if (!transitRes.metaData?.plan || transitRes.metaData.plan.itineraries.length === 0) {
          const walkRes = await getWalkRouteByTmap({
            startX: selectedSchedule.locationLon,
            startY: selectedSchedule.locationLat,
            endX: currentCoords.lon,
            endY: currentCoords.lat,
          });
          duration = walkRes.totalTime;
        } else {
          const allTransitRoutes = transitRes.metaData.plan.itineraries.length;
          duration =
            transitRes.metaData.plan.itineraries.reduce((acc, cur) => acc + cur.totalTime, 0) /
            allTransitRoutes;
        }

        const recommendedTime = calculateNextScheduleStartTime(selectedSchedule, duration);
        const result = {
          duration,
          startAt: recommendedTime,
        };

        routeCacheRef.current.set(cacheKey, result);
        setRecommendTime(result);
      } catch (error) {
        console.error("Failed to calculate transport duration:", error);
        setRecommendTime({
          duration: null,
          startAt: null,
        });
      } finally {
        setIsSettingRecommendTime(false);
      }
    };

    calculateRecommendedTime();
  }, [selectedScheduleId, currentCoords, regularScheduleCandidates]);

  // 추천 시간 적용 핸들러
  const applyRecommendedTime = () => {
    if (recommendTime.startAt) {
      form.setValue("startAt", recommendTime.startAt, { shouldValidate: true });
      toast.success("추천 시간이 적용되었습니다");
    }
  };
  // 시간 경고 확인 핸들러
  const handleTimeWarningConfirm = async () => {
    setShowTimeWarning(false);
    if (pendingFormData) {
      await submitSchedule(pendingFormData);
      setPendingFormData(null);
    }
  };

  // 시간 경고 취소 핸들러
  const handleTimeWarningCancel = () => {
    setShowTimeWarning(false);
    setPendingFormData(null);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] w-[95%] max-w-lg overflow-hidden">
          <DialogHeader>
            <DialogTitle>새로운 일정 추가</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="max-h-[60vh] space-y-4 overflow-y-auto p-4">
                {/* 일정 타입 선택 */}
                <FormField
                  control={form.control}
                  name="scheduleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        어떤 일정인가요?<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          variant="outline"
                          value={field.value}
                          onValueChange={(val) => {
                            if (val) {
                              field.onChange(val);
                              handleScheduleTypeChange(val as Exclude<ScheduleType, "TRANSPORT">);
                            }
                          }}
                          className="w-full"
                        >
                          <ToggleGroupItem value="MEAL" className="flex-1 gap-2">
                            <UtensilsIcon className="size-4" />
                            <span>식사</span>
                          </ToggleGroupItem>
                          <ToggleGroupItem value="WAITING" className="flex-1 gap-2">
                            <CoffeeIcon className="size-4" />
                            <span>카페</span>
                          </ToggleGroupItem>
                          <ToggleGroupItem value="ACTIVITY" className="flex-1 gap-2">
                            <NotepadTextIcon className="size-4" />
                            <span>기타</span>
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 일정 선택 (기존 일정 연결) */}
                {regularScheduleCandidates.length > 0 && (
                  <FormField
                    control={form.control}
                    name="selectedRegularScheduleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>일정 선택</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value || "new"}
                            onValueChange={(value) => handleScheduleChange(value, field, form)}
                          >
                            <SelectTrigger className="w-(--radix-form-item-width) overflow-hidden *:data-[slot=select-value]:*:w-full">
                              <SelectValue placeholder="이전 일정 이어서 시작" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">직접 시간 설정</SelectItem>
                              {regularScheduleCandidates.map((item) => (
                                <SelectItem key={item.id} value={String(item.id)}>
                                  {item.title} ({formatTimeToKoreanAMPM(item.startAt)},{" "}
                                  {item.duration}
                                  분)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* 장소 선택 */}
                <PlaceSelector
                  key={currentScheduleType}
                  form={form}
                  scheduleType={currentScheduleType}
                  defaultCoords={defaultCoords}
                />
                {/* 일정 제목 */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        일정 이름<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="예: 점심 식사, 굿즈 구매" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  {/* 시작 시간 */}
                  <FormField
                    control={form.control}
                    name="startAt"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          시작 시간<span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            step="60"
                            min={timeRange.minTime}
                            max={timeRange.maxTime}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 소요시간 */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          소요시간<span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={String(field.value)}
                            onValueChange={(val) => field.onChange(Number(val))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30분</SelectItem>
                              <SelectItem value="60">1시간</SelectItem>
                              <SelectItem value="90">1시간 30분</SelectItem>
                              <SelectItem value="120">2시간</SelectItem>
                              <SelectItem value="150">2시간 30분</SelectItem>
                              <SelectItem value="180">3시간</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* 추천시간 안내 카드 - 시작시간 입력 필드 바로 아래 배치 */}
                {recommendTime.startAt &&
                  (isSettingRecommendTime ? (
                    <Card className="border-amber-600/20 bg-amber-600/5 p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin text-amber-600" />
                        <p className="text-sm font-medium">이동 시간 기반 추천을 불러오는 중...</p>
                      </div>
                    </Card>
                  ) : (
                    <RecommendTimeCard
                      travelDuration={recommendTime.duration!}
                      recommendedStartTime={recommendTime.startAt!}
                      currentStartTime={startAt}
                      validation={timeValidation}
                      onApply={applyRecommendedTime}
                    />
                  ))}

                {/* 상세 정보 */}
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        상세 정보<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="메모를 입력하세요"
                          className="h-20 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
          </Form>
        </DialogContent>
      </Dialog>

      {/* 시간 경고 AlertDialog */}
      <AlertDialog open={showTimeWarning} onOpenChange={setShowTimeWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>현재 선택한 시간은 추천 시간이 아닙니다.</AlertDialogTitle>
            <AlertDialogDescription>
              선택하신 시간은 이동 시간을 고려한 추천 시간이 아닙니다.
              <br />
              그래도 이 시간으로 일정을 등록하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleTimeWarningCancel}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleTimeWarningConfirm}>계속 진행</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
