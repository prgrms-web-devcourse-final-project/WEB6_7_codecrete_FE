"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CarFrontIcon,
  MapPinIcon,
  PlayIcon,
  UtensilsIcon,
  CoffeeIcon,
  Loader2,
} from "lucide-react";
import SearchPlaces from "../sidebar/SearchPlaces";
import {
  ConcertCoords,
  ScheduleDetail,
  ScheduleType,
  SearchPlace,
  TransportType,
} from "@/types/planner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updatePlanSchedule } from "@/lib/api/planner/schedule.client";
import { toMinutePrecision } from "@/utils/helpers/formatters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: ScheduleDetail;
  planId: string;
  defaultCoords: ConcertCoords;
}

export default function EditScheduleDialog({
  open,
  onOpenChange,
  schedule,
  planId,
  defaultCoords,
}: EditScheduleDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [scheduleType, setScheduleType] = useState<ScheduleType | "CAFE">(schedule.scheduleType);
  const [placeName, setPlaceName] = useState(schedule.location.split(", ")[1] || "");
  const [placeAddress, setPlaceAddress] = useState(schedule.location.split(", ")[0] || "");
  const [coords, setCoords] = useState<{ lat?: number; lon?: number } | null>({
    lat: schedule.locationLat,
    lon: schedule.locationLon,
  });
  const [isPlaceSelected, setIsPlaceSelected] = useState(schedule.location ? true : false);

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
      ...schedule,
      scheduleType: scheduleType === "CAFE" ? "MEAL" : scheduleType,
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
        await updatePlanSchedule({
          planId,
          scheduleId: String(schedule.id),
          updatedData: scheduleData,
        });
        toast.success("일정이 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("Error creating schedule:", error);
        toast.error("일정 수정에 실패했습니다. 다시 시도해주세요.");
      }
    });
    router.replace(`/planner/${planId}`);
    onOpenChange(false);
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {schedule.isMainEvent ? "공연 시간 상세 설정" : "일정 항목 수정"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
            {/* 메인 이벤트(공연)는 수정 제한 */}
            {schedule.isMainEvent ? (
              <div className="bg-muted/50 rounded-lg border p-4">
                <h4 className="text-lg font-bold">{schedule.title}</h4>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPinIcon className="size-3" />
                  {schedule.concertPlaceName}
                </p>
              </div>
            ) : (
              <>
                {/* 1. 일정 타입 */}
                <Field>
                  <FieldLabel>일정 타입</FieldLabel>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={scheduleType}
                    onValueChange={(val: ScheduleType | "CAFE") => val && setScheduleType(val)}
                    className="flex-wrap justify-start"
                  >
                    <ToggleGroupItem value="MEAL" aria-label="식사" className="flex gap-2">
                      <UtensilsIcon className="size-4" /> <span>식사</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="CAFE" aria-label="카페" className="flex gap-2">
                      <CoffeeIcon className="size-4" /> <span>카페</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="ACTIVITY" aria-label="활동" className="flex gap-2">
                      <PlayIcon className="size-4" /> <span>활동</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="TRANSPORT" aria-label="이동" className="flex gap-2">
                      <CarFrontIcon className="size-4" /> <span>이동</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Field>

                {/* 2. 장소 검색 (수정 모드) */}
                <Field>
                  <Label>장소</Label>

                  {!isPlaceSelected && scheduleType !== "TRANSPORT" ? (
                    <SearchPlaces
                      placeholder="식당, 카페, 관광지 검색..."
                      onSelect={handlePlaceSelect}
                      scheduleType={scheduleType}
                      defaultValue={schedule.location}
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

                {/* 3. 제목 */}
                <Field>
                  <Label htmlFor="scheduleTitle">일정 이름</Label>
                  <Input
                    id="scheduleTitle"
                    name="scheduleTitle"
                    placeholder={placeName || "예: 점심 식사, 굿즈 구매"}
                    defaultValue={schedule.title}
                  />
                </Field>
              </>
            )}

            {/* 4. 시간 설정 */}
            <div className="flex gap-4">
              <Field className="flex-1">
                <Label htmlFor="scheduleStartTime">시작 시간</Label>
                <Input
                  type="time"
                  id="scheduleStartTime"
                  name="scheduleStartTime"
                  step="60"
                  defaultValue={toMinutePrecision(schedule.startAt) || "12:00"}
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

            {/* 5. 메모 */}
            <Field>
              <Label htmlFor="scheduleNotes">메모 (선택)</Label>
              <Textarea
                id="scheduleNotes"
                name="scheduleNotes"
                placeholder="메뉴, 예약 정보 등을 적어두세요."
                className="h-20 resize-none"
                defaultValue={schedule.details}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                취소
              </Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  수정 중...
                </>
              ) : (
                "일정 수정"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
