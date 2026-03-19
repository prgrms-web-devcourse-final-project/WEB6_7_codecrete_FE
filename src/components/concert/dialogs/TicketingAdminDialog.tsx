"use client";

import { CalendarClockIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ConcertDetail } from "@/types/concerts";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { patchTicketTimeSet } from "@/lib/api/admin/admin.client";
import { ko } from "date-fns/locale";

interface TicketingAdminDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  concertDetail: ConcertDetail | null;
}

export default function TicketingAdminDialog({
  open,
  onOpenChange,
  concertDetail,
}: TicketingAdminDialogProps) {
  // 링크 이동
  const router = useRouter();

  // 티켓팅 등록 상태 관리
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startTicketDate, setStartTicketDate] = useState<Date | undefined>(undefined);
  const [endTicketDate, setEndTicketDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("20:00");
  const [endTime, setEndTime] = useState("20:00");
  // 티켓팅 일정 등록용
  const [isUpdatingTicketing, startTicketingUpdate] = useTransition();

  // 어드민 - 티켓팅 일정 등록 핸들러
  const handlePatchTicketing = () => {
    startTicketingUpdate(async () => {
      if (!concertDetail?.concertId) {
        toast.error("콘서트 정보가 올바르지 않습니다.");
        return;
      }
      if (!startTicketDate || !endTicketDate) {
        toast.error("시작 및 종료 티켓팅 일정을 모두 선택해주세요.");
        return;
      }

      // 날짜와 시간을 합쳐서 완전한 DateTime 생성
      const startDateTime = new Date(startTicketDate);
      const [startHour, startMinute] = startTime.split(":").map(Number);
      startDateTime.setHours(startHour, startMinute, 0);

      const endDateTime = new Date(endTicketDate);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      endDateTime.setHours(endHour, endMinute, 0);

      if (startDateTime >= endDateTime) {
        toast.error("티켓팅 시작 일시는 종료 일시보다 앞서야 합니다.");
        return;
      }

      try {
        // 한국 시간을 그대로 유지하면서 ISO 형식으로 변환
        const formatToKSTISOString = (date: Date): string => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${year}-${month}-${day}T${hours}:${minutes}:00`;
        };

        const result = await patchTicketTimeSet({
          concertId: concertDetail.concertId,
          ticketTime: formatToKSTISOString(startDateTime),
          ticketEndTime: formatToKSTISOString(endDateTime),
        });

        if (result.resultCode === "ERROR") {
          toast.error(result.msg || "티켓팅 일정 저장에 실패했습니다.");
          return;
        }

        toast.success("티켓팅 일정이 저장되었습니다.");
        onOpenChange(false);

        // 페이지 데이터 새로고침
        router.refresh();
      } catch (error) {
        console.error("Failed to patch ticketing time:", error);
        toast.error("티켓팅 일정 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange} aria-description="티켓팅 일정 등록">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>티켓팅 일정 등록</DialogTitle>
        </DialogHeader>
        <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
          <div className="flex gap-2">
            <Field>
              <FieldLabel htmlFor="date-start">예매 시작일</FieldLabel>
              <Popover open={openStart} onOpenChange={setOpenStart}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-start"
                    className="w-full justify-between font-normal"
                  >
                    {startTicketDate
                      ? startTicketDate.toLocaleDateString("ko-KR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "날짜를 선택하세요."}
                    <CalendarClockIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startTicketDate}
                    onSelect={(date) => {
                      setStartTicketDate(date);
                      setOpenStart(false);
                    }}
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <FieldLabel htmlFor="time-start" className="invisible">
                티켓팅 시간
              </FieldLabel>
              <Input
                type="time"
                id="time-start"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <Field>
              <FieldLabel htmlFor="date-end">예매 종료일</FieldLabel>
              <Popover open={openEnd} onOpenChange={setOpenEnd}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-end"
                    className="w-full justify-between font-normal"
                  >
                    {endTicketDate
                      ? endTicketDate.toLocaleDateString("ko-KR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "날짜를 선택하세요."}
                    <CalendarClockIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endTicketDate}
                    onSelect={(date) => {
                      setEndTicketDate(date);
                      setOpenEnd(false);
                    }}
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <FieldLabel htmlFor="time-end" className="invisible">
                티켓팅 시간
              </FieldLabel>
              <Input
                type="time"
                id="time-end"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>
          </div>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button disabled={isUpdatingTicketing} onClick={handlePatchTicketing}>
            {isUpdatingTicketing ? (
              <>
                <Loader2Icon className="animate-spin" />
                등록 중...
              </>
            ) : (
              "티켓팅 일정 등록"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
