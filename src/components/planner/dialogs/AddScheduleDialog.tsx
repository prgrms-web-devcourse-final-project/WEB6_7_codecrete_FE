"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
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
import { UtensilsIcon, CoffeeIcon, Loader2, NotepadTextIcon, ZapIcon } from "lucide-react";

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
import { Card } from "@/components/ui/card";

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

  // watch를 사용해서 실시간으로 값 추적
  const selectedScheduleId = useWatch({
    control: form.control,
    name: "selectedRegularScheduleId",
  });

  const currentCoords = useWatch({
    control: form.control,
    name: "coords",
  });

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

      try {
        let duration: number;

        // 대중교통 조회
        const transitRes = await getTransitRouteDetailsByTmap({
          startX: selectedSchedule.locationLon,
          startY: selectedSchedule.locationLat,
          endX: currentCoords.lon,
          endY: currentCoords.lat,
        });

        if (!transitRes.metaData?.plan || transitRes.metaData.plan.itineraries.length === 0) {
          // 도보 조회
          const walkRes = await getWalkRouteByTmap({
            startX: selectedSchedule.locationLon,
            startY: selectedSchedule.locationLat,
            endX: currentCoords.lon,
            endY: currentCoords.lat,
          });
          duration = walkRes.totalTime;
        } else {
          const allTransitRoutes = transitRes.metaData.plan.itineraries.length;
          // 모든 경로의 평균 소요시간 계산
          duration =
            transitRes.metaData.plan.itineraries.reduce((acc, cur) => acc + cur.totalTime, 0) /
            allTransitRoutes;
        }

        const recommendedTime = calculateNextScheduleStartTime(selectedSchedule, duration);
        setRecommendTime({
          duration,
          startAt: recommendedTime,
        });
      } catch (error) {
        console.error("Failed to calculate transport duration:", error);
        setRecommendTime({
          duration: null,
          startAt: null,
        });
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

  return (
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
              {recommendTime.startAt && (
                <Card className="border-amber-600/20 bg-amber-600/5 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-600/5 p-1.5">
                        <ZapIcon className="size-4 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium">이동 시간 기반 추천</p>
                    </div>

                    <div className="text-muted-foreground space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>예상 이동 시간</span>
                        <span className="text-primary font-semibold">
                          약 {Math.ceil(recommendTime.duration! / 60)} 분
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>추천 시작 시간</span>
                        <span className="text-primary font-semibold">
                          {formatTimeToKoreanAMPM(recommendTime.startAt!)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      className="w-full"
                      onClick={applyRecommendedTime}
                    >
                      추천 시간으로 설정
                    </Button>

                    <p className="text-muted-foreground text-xs">
                      * 교통 상황에 따라 실제 소요시간은 다를 수 있습니다
                    </p>
                  </div>
                </Card>
              )}

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
  );
}
