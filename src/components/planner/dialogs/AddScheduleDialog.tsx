"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
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
import { CarFrontIcon, UtensilsIcon, CoffeeIcon, Loader2, NotepadTextIcon } from "lucide-react";
import { PlaceSelector } from "./fields/PlaceSelector";
import { TransportSelector } from "./fields/TransportSelector";
import { createPlanSchedule } from "@/lib/api/planner/schedule.client";
import {
  scheduleFormSchema,
  type ScheduleFormData,
  getDefaultScheduleValues,
} from "@/lib/zod/schedule.schema";
import { transformToScheduleDetail } from "@/utils/helpers/scheduleTransform";
import { toMinutePrecision, formatTimeToKoreanAMPM } from "@/utils/helpers/formatters";
import { getScheduleEndTime } from "@/utils/helpers/scheduleTransform";
import {
  ConcertCoords,
  ScheduleDetail,
  ScheduleType,
  Itinerary,
  KakaoMapSummary,
  TMapWalkRoute,
} from "@/types/planner";

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
  const [isPending, startTransition] = useTransition();

  // scheduleType을 별도 state로 관리 (폼 리셋용)
  const [currentScheduleType, setCurrentScheduleType] = useState<ScheduleType>("MEAL");

  // 경로 데이터 state
  const [routeContext, setRouteContext] = useState<{
    routeData: Itinerary[];
    selectedRoute: Itinerary | null;
    carRouteSummary: KakaoMapSummary | null;
    walkRouteSummary: TMapWalkRoute | null;
  }>({
    routeData: [],
    selectedRoute: null,
    carRouteSummary: null,
    walkRouteSummary: null,
  });

  // 이동 경로 선택지
  const transportCandidates = useMemo(
    () => schedules.filter((s) => s.id && s.scheduleType !== "TRANSPORT" && s.location),
    [schedules]
  );

  // 일반 일정 선택지
  const regularScheduleCandidates = useMemo(
    () =>
      schedules.filter(
        (s) => s.id && s.scheduleType !== "TRANSPORT" && !s.isMainEvent && s.location
      ),
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

  // 초기화 로직을 함수로 분리 (이벤트 핸들러에서만 호출)
  const resetToInitialState = () => {
    setCurrentScheduleType("MEAL");
    const initialValues = getDefaultScheduleValues("MEAL", toMinutePrecision(defaultStartTime));
    form.reset(initialValues, {
      keepDirty: false,
      keepTouched: false,
      keepIsValid: false,
      keepErrors: false,
    });
    setRouteContext({
      routeData: [],
      selectedRoute: null,
      carRouteSummary: null,
      walkRouteSummary: null,
    });
  };

  // scheduleType 변경 핸들러
  const handleScheduleTypeChange = (newType: ScheduleType) => {
    setCurrentScheduleType(newType);
    const newValues = getDefaultScheduleValues(newType, toMinutePrecision(defaultStartTime));
    form.reset(newValues, {
      keepDirty: false,
      keepTouched: false,
      keepIsValid: false,
      keepErrors: false,
    });
    setRouteContext({
      routeData: [],
      selectedRoute: null,
      carRouteSummary: null,
      walkRouteSummary: null,
    });
  };

  // 다이얼로그 열기/닫기 핸들러 (이벤트 핸들러에서 직접 호출)
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // 열릴 때만 초기화
      resetToInitialState();
    }
    // 닫힐 때는 초기화 안 해도 됨 (다음에 열릴 때 초기화되므로)
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
    } else if (scheduleType === "TRANSPORT") {
      if ("startScheduleId" in errors) {
        toast.error("출발 일정을 선택해주세요");
      }
    }
  };

  // 폼 제출
  const onSubmit = async (data: ScheduleFormData) => {
    startTransition(async () => {
      try {
        const scheduleData = transformToScheduleDetail(data, {
          transportCandidates,
          selectedRoute: routeContext.selectedRoute,
          carRouteSummary: routeContext.carRouteSummary,
          walkRouteSummary: routeContext.walkRouteSummary,
        });

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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95%] overflow-hidden sm:max-w-lg">
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
                      어떤 일정인가요?<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        value={field.value}
                        onValueChange={(val) => {
                          if (val) {
                            field.onChange(val);
                            handleScheduleTypeChange(val as ScheduleType);
                          }
                        }}
                      >
                        <ToggleGroupItem value="MEAL" className="flex-1 gap-2">
                          <UtensilsIcon className="size-4" />
                          <span>식사</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="WAITING" className="flex-1 gap-2">
                          <CoffeeIcon className="size-4" />
                          <span>카페</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="TRANSPORT" className="flex-1 gap-2">
                          <CarFrontIcon className="size-4" />
                          <span>이동</span>
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

              {/* 일정 선택 (일반 스케줄) */}
              {currentScheduleType !== "TRANSPORT" && regularScheduleCandidates.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedRegularScheduleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>일정 선택</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || "new"}
                          onValueChange={(value) => {
                            if (value === "new") {
                              field.onChange(undefined);
                            } else {
                              field.onChange(value);
                              const selectedSchedule = regularScheduleCandidates.find(
                                (s) => String(s.id) === value
                              );
                              if (selectedSchedule) {
                                const endTime = getScheduleEndTime(selectedSchedule);
                                form.setValue("startAt", endTime, { shouldValidate: false });
                              }
                            }
                          }}
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

              {/* 장소 선택 (일반 스케줄) */}
              {currentScheduleType !== "TRANSPORT" && (
                <PlaceSelector
                  key={currentScheduleType}
                  form={form}
                  scheduleType={currentScheduleType}
                  defaultCoords={defaultCoords}
                />
              )}

              {/* 일정 제목 */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      일정 이름<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="예: 점심 식사, 굿즈 구매" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 시간 설정 (일반 스케줄만) */}
              {currentScheduleType !== "TRANSPORT" && (
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="startAt"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          시작 시간<span className="text-red-500">*</span>
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

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          소요시간<span className="text-red-500">*</span>
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
              )}

              {/* 이동 수단 선택 (TRANSPORT) */}
              {currentScheduleType === "TRANSPORT" && (
                <TransportSelector
                  form={form}
                  transportCandidates={transportCandidates}
                  onRouteDataChange={setRouteContext}
                />
              )}

              {/* 상세 정보 */}
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      상세 정보<span className="text-red-500">*</span>
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
  );
}
