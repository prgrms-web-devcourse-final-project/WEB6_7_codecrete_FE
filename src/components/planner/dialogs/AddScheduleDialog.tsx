"use client";

import { useState } from "react";
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
import { CarFrontIcon, ClockIcon, StarIcon, UtensilsIcon } from "lucide-react";
import SearchPlaces from "../sidebar/SearchPlaces";

interface AddScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddScheduleDialog({ open, onOpenChange }: AddScheduleDialogProps) {
  const [value, setValue] = useState("");
  const [coords, setCoords] = useState<{ lat?: number; lng?: number } | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95%] overflow-hidden sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>일정 항목 추가</DialogTitle>
        </DialogHeader>
        <FieldGroup className="max-h-[70vh] overflow-y-auto p-4">
          <Field>
            <FieldLabel htmlFor="scheduleType">일정 타입</FieldLabel>
            <ToggleGroup
              type="single"
              variant="outline"
              className="*:border-border *:fill-text-sub *:text-text-sub *:data-[state=on]:bg-point-main *:data-[state=on]:[svg]:fill-point-sub *:data-[state=on]:text-point-sub flex flex-wrap justify-start"
            >
              <ToggleGroupItem value="transport" aria-label="이동수단">
                <CarFrontIcon className="h-4 w-4" />
                <span className="text-xs sm:text-sm">이동수단</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="meal" aria-label="식사">
                <UtensilsIcon className="h-4 w-4" />
                <span className="text-xs sm:text-sm">식사</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="waiting" aria-label="대기">
                <ClockIcon className="h-4 w-4" />
                <span className="text-xs sm:text-sm">대기</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="activity" aria-label="활동">
                <StarIcon className="h-4 w-4" />
                <span className="text-xs sm:text-sm">활동</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </Field>

          <Field>
            <Label htmlFor="transportType">종류</Label>
            <Select name="transportType">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="이동수단을 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">대중교통</SelectItem>
                <SelectItem value="car">자동차</SelectItem>
                <SelectItem value="walk">도보</SelectItem>
                <SelectItem value="bicycle">자전거</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="scheduleTitle">제목</Label>
            <Input
              id="scheduleTitle"
              name="scheduleTitle"
              placeholder="예시: 홍대입구역에서 출발"
            />
          </Field>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Field className="flex-1">
              <Label htmlFor="scheduleStartTime">시작 시간</Label>
              <Input
                type="time"
                id="scheduleStartTime"
                name="scheduleStartTime"
                step="1"
                defaultValue="10:30:00"
                className="bg-background w-full appearance-none"
              />
            </Field>
            <Field className="flex-1">
              <Label htmlFor="scheduleDurationTime">소요 시간</Label>
              <Input
                type="time"
                id="scheduleDurationTime"
                step="1"
                defaultValue="10:30:00"
                className="bg-background w-full appearance-none"
              />
            </Field>
          </div>

          <Field>
            <Label htmlFor="scheduleLocation">장소</Label>
            <SearchPlaces
              placeholder="장소 또는 주소를 검색하세요"
              onSelect={(place) => {
                setValue(place.place_name);
                setCoords({ lat: place.y, lng: place.x });
              }}
            />
            {/* 디버깅용 (필요 시 삭제) */}
            <p className="hidden">
              {value}, {coords?.lat}, {coords?.lng}
            </p>
          </Field>

          <Field>
            <Label htmlFor="scheduleNotes">메모</Label>
            <Textarea
              id="scheduleNotes"
              name="scheduleNotes"
              placeholder="일정에 대한 메모를 작성하세요."
              className="h-20 resize-none"
            />
          </Field>
        </FieldGroup>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              취소
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full sm:w-auto">
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
