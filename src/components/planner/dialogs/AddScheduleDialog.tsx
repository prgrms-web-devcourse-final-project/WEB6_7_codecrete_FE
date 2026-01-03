"use client";

import { useState, useTransition } from "react";
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
import { ConcertCoords, ScheduleType, SearchPlace, TransportType } from "@/types/planner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toMinutePrecision } from "@/utils/helpers/formatters";

interface AddScheduleDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultStartTime?: string;
  defaultCoords?: ConcertCoords;
}

export default function AddScheduleDialog({
  planId,
  open,
  onOpenChange,
  defaultStartTime,
  defaultCoords,
}: AddScheduleDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [scheduleType, setScheduleType] = useState<ScheduleType>("MEAL");
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [coords, setCoords] = useState<{ lat?: number; lon?: number } | null>(null);
  const [isPlaceSelected, setIsPlaceSelected] = useState(false);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("scheduleTitle") as string;
    const startTime = formData.get("scheduleStartTime") as string;
    const duration = Number(formData.get("scheduleDuration"));
    const transportType = formData.get("transportType") as TransportType;
    const notes = formData.get("scheduleNotes") as string;
    const estimatedCost = 0; // TODO : 비용 입력 필드 추가 시 반영

    const normalizedStartAt = startTime ? `${toMinutePrecision(startTime)}:00` : "";

    const scheduleData = {
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

    startTransition(async () => {
      try {
        await createPlanSchedule({
          planId,
          scheduleData,
        });
        toast.success("일정이 성공적으로 생성되었습니다.");
        router.refresh();
      } catch (error) {
        console.error("Error creating schedule:", error);
        toast.error("일정 생성에 실패했습니다. 다시 시도해주세요.");
      } finally {
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

        <form onSubmit={handleSubmit}>
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
            <Field>
              <Label htmlFor="scheduleLocation">장소</Label>

              {!isPlaceSelected && scheduleType !== "TRANSPORT" ? (
                <SearchPlaces
                  placeholder="식당, 카페, 관광지 검색..."
                  onSelect={handlePlaceSelect}
                  scheduleType={scheduleType}
                  defaultCoords={defaultCoords}
                />
              ) : (
                <div className="border-input dark:bg-input/30 flex items-center justify-between rounded-md border p-3">
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
                  >
                    다시 검색
                  </Button>
                </div>
              )}
            </Field>
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

            {/* 4. 시간 설정 (간소화) */}
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

            {/* 5. 이동 수단 상세 (이동 타입일 때만 노출) */}
            {scheduleType === "TRANSPORT" && (
              <Field>
                <Label htmlFor="transportType">이동 수단</Label>
                <Select name="transportType" defaultValue="PUBLIC_TRANSPORT">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLIC_TRANSPORT">대중교통</SelectItem>
                    <SelectItem value="CAR">자동차 / 택시</SelectItem>
                    <SelectItem value="WALK">도보</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
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
