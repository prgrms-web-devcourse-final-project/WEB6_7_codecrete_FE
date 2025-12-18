"use client";

import {
  CarFrontIcon,
  ClockIcon,
  PlusIcon,
  UserRoundPlusIcon,
  MapIcon,
  StarIcon,
  UtensilsIcon,
  SaveIcon,
  Share2Icon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SearchPlaces from "@/components/planner/SearchPlaces";
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
import { Separator } from "@/components/ui/separator";
import { PlannerMembers } from "./PlannerMembers";
import { twMerge } from "tailwind-merge";

export default function PlannerTopActions() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [value, setValue] = useState("");
  const [coords, setCoords] = useState<{ lat?: string; lng?: string } | null>(null); // 좌표 저장

  const handleAddDialog = () => {
    setShowAddDialog(true);
  };
  const handleInviteDialog = () => {
    setShowInviteDialog(true);
  };
  const handleShareDialog = () => {
    setShowShareDialog(true);
  };
  const handleSave = () => {
    // TODO : 저장 로직 구현
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("Thank you for using Shadcn Studio!");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <section className="border-border border-y px-15">
        <div className="mx-auto max-w-400">
          <div className="flex justify-between py-4">
            <div className="flex gap-4">
              <Button onClick={handleAddDialog} variant="default">
                <PlusIcon />
                일정 추가하기
              </Button>
              <Button onClick={handleInviteDialog} variant="outline">
                <UserRoundPlusIcon />
                친구 초대
              </Button>
              <Button variant="outline">
                <MapIcon />
                지도 보기
              </Button>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleShareDialog} variant="default">
                <Share2Icon />
                공유하기
              </Button>
              <Button onClick={handleSave} variant="outline">
                <SaveIcon />
                저장하기
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Dialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        aria-description="일정 항목 추가"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>일정 항목 추가</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] overflow-y-auto p-4">
            <Field>
              <FieldLabel htmlFor="scheduleType">일정 타입</FieldLabel>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={2}
                className="*:border-border *:fill-text-sub *:text-text-sub *:data-[state=on]:bg-point-main *:data-[state=on]:[svg]:fill-point-sub *:data-[state=on]:text-point-sub"
              >
                <ToggleGroupItem value="transport" aria-label="이동수단">
                  <CarFrontIcon />
                  이동수단
                </ToggleGroupItem>
                <ToggleGroupItem value="meal" aria-label="식사">
                  <UtensilsIcon />
                  식사
                </ToggleGroupItem>
                <ToggleGroupItem value="waiting" aria-label="대기">
                  <ClockIcon />
                  대기
                </ToggleGroupItem>
                <ToggleGroupItem value="activity" aria-label="활동">
                  <StarIcon />
                  활동
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
            <Field>
              <Label htmlFor="transportType">종류</Label>
              <Select name="transportType">
                <SelectTrigger className="w-[180px]">
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
            <div className="flex gap-4">
              <Field>
                <Label htmlFor="scheduleStartTime">시작 시간</Label>
                <Input
                  type="time"
                  id="scheduleStartTime"
                  name="scheduleStartTime"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </Field>
              <Field>
                <Label htmlFor="scheduleDurationTime">소요 시간</Label>
                <Input
                  type="time"
                  id="scheduleDurationTime"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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
              {/* TODO: 린트 규칙때문에 넣음 나중에 없앨것 */}
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
          <DialogFooter className="">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">등록</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        aria-description="친구 초대"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>친구 초대</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
            <Field>
              <FieldLabel htmlFor="scheduleType">링크 공유하기</FieldLabel>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value="https://example.com/invite-link"
                  className="read-only:bg-muted"
                />
                <Button
                  className="relative disabled:opacity-100"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  <span
                    className={twMerge(
                      "transition-all",
                      copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                  >
                    <CheckIcon className="stroke-green-600 dark:stroke-green-400" />
                  </span>
                  <span
                    className={twMerge(
                      "absolute left-4 transition-all",
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    )}
                  >
                    <CopyIcon />
                  </span>
                  {copied ? "복사됨" : "복사"}
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                초대 링크를 복사하여 친구들에게 공유하세요.
              </p>
            </Field>
            <Separator />
            <Field>
              <FieldLabel htmlFor="scheduleType">이메일이나 닉네임으로 초대하기</FieldLabel>
              <div className="flex gap-2">
                <Input type="email" placeholder="이메일이나 닉네임을 입력하세요." />
                <Button type="submit">초대하기</Button>
              </div>
            </Field>
            <Separator />
            <PlannerMembers />
          </FieldGroup>
        </DialogContent>
      </Dialog>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog} aria-description="공유하기">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>링크 공유</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
            <Field>
              <FieldLabel htmlFor="scheduleType">링크 공유하기</FieldLabel>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value="https://example.com/invite-link"
                  className="read-only:bg-muted"
                />
                <Button
                  className="relative disabled:opacity-100"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  <span
                    className={twMerge(
                      "transition-all",
                      copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                  >
                    <CheckIcon className="stroke-green-600 dark:stroke-green-400" />
                  </span>
                  <span
                    className={twMerge(
                      "absolute left-4 transition-all",
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    )}
                  >
                    <CopyIcon />
                  </span>
                  {copied ? "복사됨" : "복사"}
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                초대 링크를 복사하여 친구들에게 공유하세요.
              </p>
            </Field>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}
