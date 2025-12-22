"use client";

import { CalendarClockIcon, CalendarPlus2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@/types/user";
import { useState } from "react";
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
import { patchTicketTimeSet } from "@/lib/api/concerts";

export default function ConcertHeaderBtn({
  concertDetail,
  concertTicketingData,
  userData,
}: {
  concertDetail: ConcertDetail | null;
  concertTicketingData: TicketOffice[] | null;
  userData: User | null;
}) {
  // 모달 상태 관리
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(false);
  const [ticketingDialogOpen, setTicketingDialogOpen] = useState(false);

  // 티켓팅 등록 상태 관리
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startTicketDate, setStartTicketDate] = useState<Date | undefined>(undefined);
  const [endTicketDate, setEndTicketDate] = useState<Date | undefined>(undefined);

  // TODO : 플래너 생성 함수... 추후 구현 필요
  const handleCreatePlanner = async () => {
    // 플래너 생성 로직 구현
  };

  const handleCreateTicketing = async () => {
    // 티켓팅 등록 로직 구현
    await patchTicketTimeSet({
      concertId: concertDetail?.concertId || "",
      startDateTime: startTicketDate?.toISOString() || "",
      endDateTime: endTicketDate?.toISOString() || "",
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
          onClick={() => setTicketDialogOpen(true)}
        >
          <ExternalLink />
          티켓 예매하기
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild={false}
          className="bg-point-sub border-border-point w-full flex-1 cursor-pointer"
          onClick={() => setPlannerDialogOpen(true)}
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
            onClick={() => setTicketingDialogOpen(true)}
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
              <Input type="text" placeholder="플래너 제목을 입력하세요" />
            </Field>
            <Field>
              <FieldLabel>날짜</FieldLabel>
              <ConcertDatePicker
                startDate={new Date(concertDetail?.startDate?.split("-").join(",") ?? "")}
                endDate={new Date(concertDetail?.endDate?.split("-").join(",") ?? "")}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlannerDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreatePlanner}>만들기</Button>
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
                  step="1"
                  defaultValue="09:30:00"
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
                  id="time-end"
                  step="1"
                  defaultValue="09:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTicketingDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreateTicketing}>등록</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
