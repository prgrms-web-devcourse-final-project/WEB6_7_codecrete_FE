"use client";

import { useRef, useState } from "react";
import {
  ExternalLink,
  TicketIcon,
  CalendarPlus2Icon,
  ArrowRightIcon,
  Share2Icon,
  CheckIcon,
  CopyIcon,
  BellIcon,
  MessageSquareIcon,
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { createNewPlan } from "@/lib/api/planner/planner.client";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { postLikeConcert } from "@/lib/api/concerts/concerts.client";
import { getConcertStartDate, isSameDay, dateToISOString } from "@/utils/helpers/handleDate";

export default function QuickActionsSection({
  concertId,
  concertTicketingData,
  concertStartDate,
  concertEndDate,
  userData,
  isLiked,
}: {
  concertId?: string;
  concertTicketingData?: TicketOffice[] | null;
  concertStartDate?: string;
  concertEndDate?: string;
  userData: User | null;
  isLiked?: boolean;
}) {
  // 링크 이동
  const router = useRouter();

  // 링크 공유하기 Input
  const shareInputRef = useRef<HTMLInputElement>(null);

  // 모달 상태 관리
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [alarmDialogOpen, setAlarmDialogOpen] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);

  // 공유하기 복사 상태 관리
  const [copied, setCopied] = useState<boolean>(false);

  // 플래너 생성 상태 관리
  const [plannerTitle, setPlannerTitle] = useState<string>("");
  const [plannerDate, setPlannerDate] = useState<Date | undefined>(undefined);

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
  const handleOpenShareModal = () => {
    setShareDialogOpen(true);
  };
  const handleOpenAlarmModal = () => {
    if (!userData) {
      toast.error("로그인 후 이용해주세요.");
      return;
    }
    setAlarmDialogOpen(true);
  };
  const handleOpenChatModal = () => {
    setChatDialogOpen(true);
  };

  // 모달 닫기 핸들러
  const handleClosePlannerModal = () => {
    setPlannerDialogOpen(false);
  };

  // 플래너 생성 핸들러
  const handleCreateNewPlan = async () => {
    if (!concertId) {
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
    const concertStart = getConcertStartDate(concertStartDate!);
    if (isSameDay(plannerDate, concertStart)) {
      toast.error("오늘은 공연 시작일이므로 플래너를 생성할 수 없습니다.");
      return;
    }

    const data = await createNewPlan({
      concertId: concertId,
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

  // 알림 설정하기 핸들러 (찜하기)
  const handleLikeConcert = async () => {
    if (!concertId) return;

    if (isLiked) {
      toast.error("이미 알림 설정된 공연입니다.");
      return;
    }
    await postLikeConcert(concertId);
    toast.success("알림이 설정되었습니다.");
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={handleOpenTicketModal}
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
          onClick={handleOpenPlannerModal}
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
          onClick={handleOpenShareModal}
          className="border-border bg-point-sub flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Share2Icon className="h-4 w-4" />
            공유하기
          </div>
          <ArrowRightIcon className="text-text-sub h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleOpenAlarmModal}
          className="border-border bg-point-sub flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <BellIcon className="h-4 w-4" />
            알림 설정하기
          </div>
          <ArrowRightIcon className="text-text-sub h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleOpenChatModal}
          className="border-border bg-point-sub flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <MessageSquareIcon className="h-4 w-4" />
            채팅 참여하기
          </div>
          <ArrowRightIcon className="text-text-sub h-4 w-4" />
        </Button>
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
                startDate={new Date(concertStartDate?.split("-").join(",") ?? "")}
                endDate={new Date(concertEndDate?.split("-").join(",") ?? "")}
                onChange={(date) => setPlannerDate(date)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={handleClosePlannerModal}>
              취소
            </Button>
            <Button onClick={handleCreateNewPlan}>만들기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 공유하기 만들기 클릭 시 모달 */}
      <Dialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        aria-description="공연 정보 공유하기"
      >
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

      {/* 알림 설정하기 클릭 시 모달 */}
      <AlertDialog
        open={alarmDialogOpen}
        onOpenChange={setAlarmDialogOpen}
        aria-description="알림 설정하기"
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>알림을 설정하시겠어요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            이 공연을 찜하고, 예매 오픈 일정에 맞춰 안내 이메일을 받아보세요.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleLikeConcert}>설정</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 채팅 참여하기 클릭 시 모달 */}
      <AlertDialog
        open={chatDialogOpen}
        onOpenChange={setChatDialogOpen}
        aria-description="채팅 참여하기"
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>채팅에 참여하시겠어요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            예매일이 임박한 공연이에요.
            <br />
            채팅에 참여해 실시간 서버 시간과 다른 이용자들과의 이야기를 함께 나눠보세요.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction>참여</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
