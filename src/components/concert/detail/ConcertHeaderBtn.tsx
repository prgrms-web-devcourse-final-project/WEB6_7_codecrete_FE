"use client";

import { CalendarClockIcon, CalendarPlus2, ExternalLink, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@/types/user";
import { useState, useTransition } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ConcertDatePicker } from "./ConcertDatePicker";
import { ConcertDetail, TicketOffice } from "@/types/concerts";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { createNewPlan } from "@/lib/api/planner/planner.client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ko } from "date-fns/locale";
import { patchTicketTimeSet } from "@/lib/api/admin/admin.client";
import { getConcertStartDate, isSameDay, dateToISOString } from "@/utils/helpers/handleDate";

export default function ConcertHeaderBtn({
  concertDetail,
  concertTicketingData,
  userData,
}: {
  concertDetail: ConcertDetail | null;
  concertTicketingData: TicketOffice[] | null;
  userData: User | null;
}) {
  // 링크 이동
  const router = useRouter();

  // 모달 상태 관리
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(false);
  const [ticketingDialogOpen, setTicketingDialogOpen] = useState(false);

  // 티켓팅 등록 상태 관리
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startTicketDate, setStartTicketDate] = useState<Date | undefined>(undefined);
  const [endTicketDate, setEndTicketDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("20:00");
  const [endTime, setEndTime] = useState("20:00");

  // 플래너 생성 상태 관리
  const [plannerTitle, setPlannerTitle] = useState<string>("");
  const [plannerDate, setPlannerDate] = useState<Date | undefined>(undefined);

  // 플래너 생성 트랜지션
  const [isCreatingPlan, startPlanCreation] = useTransition();
  // 티켓팅 일정 등록용
  const [isUpdatingTicketing, startTicketingUpdate] = useTransition();

  // 모달 열기 핸들러
  const handleOpenTicketModal = () => {
    setTicketDialogOpen(true);
  };
  const handleOpenPlannerModal = () => {
    if (!userData) {
      toast.error("로그인 후 이용해주세요.");
      return;
    }
    setPlannerDialogOpen(true);
  };
  const handleOpenTicketingModal = () => {
    setTicketingDialogOpen(true);
  };

  // 모달 닫기 핸들러
  const handleClosePlannerModal = () => {
    setPlannerDialogOpen(false);
  };
  const handleCloseTicketingModal = () => {
    setTicketingDialogOpen(false);
  };

  // 플래너 생성 핸들러
  const handleCreateNewPlan = () => {
    startPlanCreation(async () => {
      if (!concertDetail?.concertId) {
        toast.error("선택된 공연이 없습니다.");
        return;
      }
      if (!plannerTitle) {
        toast.error("플래너 제목을 입력해주세요.");
        return;
      }
      if (!plannerDate) {
        toast.error("플래너 날짜를 선택해주세요.");
        return;
      }

      // 공연 당일 확인
      const concertStart = getConcertStartDate(concertDetail.startDate);
      if (isSameDay(plannerDate, concertStart)) {
        toast.error("오늘은 공연 시작일이므로 플래너를 생성할 수 없습니다.");
        return;
      }

      const data = await createNewPlan({
        concertId: concertDetail.concertId,
        title: plannerTitle.trim(),
        planDate: dateToISOString(plannerDate),
      });

      if (!data) {
        toast.error("플래너 생성에 실패했습니다.");
        return;
      }

      toast.success("플래너가 생성되었습니다.");
      setPlannerDialogOpen(false);

      router.push(`/planner/${data.data.id}`);
    });
  };

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
        setTicketingDialogOpen(false);

        // 페이지 데이터 새로고침
        router.refresh();
      } catch (error) {
        console.error("Failed to patch ticketing time:", error);
        toast.error("티켓팅 일정 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    });
  };

  return (
    <>
      <div className="button flex w-full gap-4">
        <Button
          variant="default"
          size="lg"
          asChild={false}
          className="bg-point-main w-full flex-1 cursor-pointer"
          onClick={handleOpenTicketModal}
        >
          <ExternalLink />
          티켓 예매하기
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild={false}
          className="bg-point-sub border-border-point w-full flex-1 cursor-pointer"
          onClick={handleOpenPlannerModal}
        >
          <CalendarPlus2 />
          플래너 만들기
        </Button>
        {userData?.role === "ADMIN" && (
          <Button
            variant="ghost"
            size="lg"
            asChild={false}
            className="bg-bg-sub border-border-point cursor-pointer"
            onClick={handleOpenTicketingModal}
          >
            <CalendarClockIcon />
          </Button>
        )}
      </div>

      {/* 티켓 예매하기 클릭 시 모달 */}
      <Dialog
        open={ticketDialogOpen}
        onOpenChange={setTicketDialogOpen}
        aria-description="티켓 예매처 목록"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>티켓 예매하기</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {concertTicketingData?.length ? (
                concertTicketingData.map((ticket) => (
                  <Link
                    key={ticket.ticketOfficeName}
                    href={ticket.ticketOfficeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border-border hover:border-point-main hover:bg-point-main/5 block rounded-lg border px-4 py-3 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground text-sm font-medium">
                          {ticket.ticketOfficeName}
                        </span>
                        <span className="text-text-sub text-xs">
                          {ticket.ticketOfficeName} 공식 예매처로 이동합니다.
                        </span>
                      </div>
                      <span className="bg-point-main text-bg-main rounded-full px-3 py-1 text-xs font-semibold">
                        예매하기
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-text-sub py-6 text-center text-sm">
                  등록된 티켓 예매처가 없습니다.
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 플래너 만들기 클릭 시 모달 */}
      <Dialog
        open={plannerDialogOpen}
        onOpenChange={setPlannerDialogOpen}
        aria-description="해당 공연 정보로 플래너 만들기"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>플래너 만들기</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
            <Field>
              <FieldLabel>제목</FieldLabel>
              <Input
                type="text"
                placeholder="플래너 제목을 입력하세요"
                value={plannerTitle}
                onChange={(e) => setPlannerTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>날짜</FieldLabel>
              <ConcertDatePicker
                startDate={new Date(concertDetail?.startDate?.split("-").join(",") ?? "")}
                endDate={new Date(concertDetail?.endDate?.split("-").join(",") ?? "")}
                onChange={(date) => setPlannerDate(date)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={handleClosePlannerModal}>
              취소
            </Button>
            <Button disabled={isCreatingPlan} onClick={handleCreateNewPlan}>
              {isCreatingPlan ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  생성 중...
                </>
              ) : (
                "플래너 만들기"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 관리자용 : 티켓팅 일정 등록 */}
      <Dialog
        open={ticketingDialogOpen}
        onOpenChange={setTicketingDialogOpen}
        aria-description="티켓팅 일정 등록"
      >
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
            <Button variant="outline" onClick={handleCloseTicketingModal}>
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
    </>
  );
}
