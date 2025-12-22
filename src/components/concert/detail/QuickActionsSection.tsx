"use client";
import { useRef, useState } from "react";
import {
  ExternalLink,
  TicketIcon,
  CalendarPlus2Icon,
  ArrowRightIcon,
  Share2Icon,
  Clock8Icon,
  Clock4Icon,
  CheckIcon,
  CopyIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TicketOffice } from "@/types/concerts";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ConcertDatePicker } from "./ConcertDatePicker";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export default function QuickActionsSection({
  concertId,
  concertTicketingData,
  concertStartDate,
  concertEndDate,
}: {
  concertId?: string;
  concertTicketingData?: TicketOffice[] | null;
  concertStartDate?: string;
  concertEndDate?: string;
}) {
  const shareInputRef = useRef<HTMLInputElement>(null);

  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const [copied, setCopied] = useState<boolean>(false);
  // TODO : 플래너 생성 함수... 추후 구현 필요
  const handleCreatePlanner = () => {
    // 플래너 생성 로직 구현
    setPlannerDialogOpen(false);
  };

  // 복사
  const handleCopy = async () => {
    if (!shareInputRef.current) return;

    const text = shareInputRef.current.value;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("링크가 복사되었습니다.");
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Failed to copy text: ", e);
      toast.error("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setTicketDialogOpen(true)}
          className="border-border bg-point-sub flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <TicketIcon className="h-4 w-4" />
            티켓 예매하기
          </div>
          <ExternalLink className="text-text-sub h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setPlannerDialogOpen(true)}
          className="border-border bg-point-sub flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CalendarPlus2Icon className="h-4 w-4" />
            플래너 만들기
          </div>
          <ArrowRightIcon className="text-text-sub h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShareDialogOpen(true)}
          className="border-border bg-point-sub flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Share2Icon className="h-4 w-4" />
            공유하기
          </div>
          <ArrowRightIcon className="text-text-sub h-4 w-4" />
        </Button>
      </div>
      {/* 
      <QuickActions Icon1={CalendarPlus2} text="플래너 만들기" />
        <QuickActions Icon1={Share2} text="공유하기" />
        <QuickActions Icon1={Bell} text="알림 설정하기" />
        <QuickActions Icon1={MessageSquare} text="채팅 참여하기" /> */}

      {/* 티켓 예매하기 클릭 시 모달 */}
      <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
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
      <Dialog open={plannerDialogOpen} onOpenChange={setPlannerDialogOpen}>
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
                startDate={new Date(concertStartDate?.split("-").join(",") ?? "")}
                endDate={new Date(concertEndDate?.split("-").join(",") ?? "")}
              />
            </Field>
            <div className="flex gap-4">
              <Field>
                <FieldLabel>시작 시간</FieldLabel>
                <div className="relative">
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="08:30:00"
                    className="peer bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
                    <Clock8Icon className="size-4" />
                  </div>
                </div>
              </Field>
              <Field>
                <FieldLabel>종료 시간</FieldLabel>
                <div className="relative">
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="08:30:00"
                    className="peer bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
                    <Clock4Icon className="size-4" />
                  </div>
                </div>
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlannerDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreatePlanner}>만들기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 공유하기 만들기 클릭 시 모달 */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공유하기</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
            <Field>
              <div className="flex gap-2">
                <Input
                  ref={shareInputRef}
                  readOnly
                  value={`https://www.naeconcertbutakhae.shop/concerts/${concertId}`}
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
            </Field>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}
