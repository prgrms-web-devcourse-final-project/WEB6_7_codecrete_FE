"use client";
import { useState } from "react";
import {
  ArrowRightIcon,
  BellIcon,
  CalendarPlus2Icon,
  ExternalLink,
  MessageSquareIcon,
  Share2Icon,
  TicketIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConcertDetail, TicketOffice } from "@/types/concerts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TicketDialog from "../dialogs/TicketDialog";
import PlannerDialog from "../dialogs/PlannerDialog";
import ShareDialog from "@/components/common/ShareDialog";
import ChatDialog from "../dialogs/ChatDialog";
import LikeDialog from "../dialogs/LikeDialog";

interface QuickActionsSectionProps {
  concertDetail: ConcertDetail;
  concertTicketing: TicketOffice[] | null;
  isLiked?: boolean;
  isAuthenticated: boolean;
  isChatAvailable: boolean;
}

export default function QuickActionsSection({
  concertDetail,
  concertTicketing,
  isLiked,
  isAuthenticated,
  isChatAvailable,
}: QuickActionsSectionProps) {
  // 링크 이동
  const router = useRouter();

  // 모달 상태 관리
  const [dialogOpen, setDialogOpen] = useState<
    "ticket" | "planner" | "share" | "alarm" | "chat" | ""
  >("");

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            if (!concertTicketing?.length) {
              toast.error("등록된 티켓 예매처가 없습니다.");
              return;
            }
            setDialogOpen("ticket");
          }}
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
          onClick={() => {
            if (!isAuthenticated) {
              toast.error("로그인 후 이용해주세요.");
              return;
            }
            setDialogOpen("planner");
          }}
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
          onClick={() => setDialogOpen("share")}
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
          onClick={() => {
            if (!isAuthenticated) {
              toast.error("로그인 후 이용해주세요.");
              return;
            }
            setDialogOpen("alarm");
          }}
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
          onClick={() => {
            if (!isAuthenticated) {
              toast.error("로그인이 필요합니다.");
              router.push("/sign-in");
              return;
            }
            if (!isChatAvailable) {
              toast.error("지금은 채팅 가능 기간이 아닙니다. 예매일을 확인해주세요.");
              return;
            }
            setDialogOpen("chat");
          }}
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
      <TicketDialog
        open={dialogOpen === "ticket"}
        onOpenChange={(open) => setDialogOpen(open ? "ticket" : "")}
        concertTicketing={concertTicketing}
      />

      {/* 플래너 만들기 클릭 시 모달 */}
      <PlannerDialog
        open={dialogOpen === "planner"}
        onOpenChange={(open) => {
          if (!isAuthenticated) {
            toast.error("로그인 후 이용해주세요.");
            return;
          }
          setDialogOpen(open ? "planner" : "");
        }}
        concertDetail={concertDetail}
      />

      {/* 공유하기 만들기 클릭 시 모달 */}
      <ShareDialog
        open={dialogOpen === "share"}
        onOpenChange={(open) => setDialogOpen(open ? "share" : "")}
        shareUrl={`https://www.naeconcertbutakhae.shop/concerts/${concertDetail.concertId}`}
      />

      {/* 알림 설정하기 클릭 시 모달 */}
      <LikeDialog
        open={dialogOpen === "alarm"}
        onOpenChange={(open) => setDialogOpen(open ? "alarm" : "")}
        concertId={concertDetail.concertId}
        isLiked={isLiked}
      />

      {/* 채팅 참여하기 클릭 시 모달 */}
      <ChatDialog
        open={dialogOpen === "chat"}
        onOpenChange={(open) => setDialogOpen(open ? "chat" : "")}
        concertId={concertDetail.concertId}
      />
    </>
  );
}
