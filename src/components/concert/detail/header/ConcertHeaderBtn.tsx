"use client";
import { CalendarClockIcon, CalendarPlus2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ConcertDetail, TicketOffice } from "@/types/concerts";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import TicketDialog from "../../dialogs/TicketDialog";
import PlannerDialog from "../../dialogs/PlannerDialog";
import TicketingAdminDialog from "../../dialogs/TicketingAdminDialog";

interface ConcertHeaderBtnProps {
  concertDetail: ConcertDetail | null;
  concertTicketing: TicketOffice[] | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export default function ConcertHeaderBtn({
  concertDetail,
  concertTicketing,
  isAuthenticated,
  isAdmin,
}: ConcertHeaderBtnProps) {
  // 모바일 여부 감지
  const isMobile = useIsMobile();

  // 사용중인 다이얼로그 상태 관리
  const [dialogOpen, setDialogOpen] = useState<"ticket" | "planner" | "admin" | "">("");

  return (
    <>
      <div className="button flex w-full gap-2 md:gap-4">
        <Button
          variant="default"
          size="lg"
          asChild={false}
          className="bg-point-main w-full flex-1 cursor-pointer"
          onClick={() => {
            if (!concertTicketing?.length) {
              toast.error("등록된 티켓 예매처가 없습니다.");
              return;
            }
            setDialogOpen("ticket");
          }}
        >
          <ExternalLink />
          {isMobile ? "예매하기" : "티켓 예매하기"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild={false}
          className="bg-point-sub border-border-point w-full flex-1 cursor-pointer"
          onClick={() => {
            if (!isAuthenticated) {
              toast.error("로그인이 필요한 기능입니다.");
              return;
            }
            setDialogOpen("planner");
          }}
        >
          <CalendarPlus2 />
          {isMobile ? "플래너" : "플래너 만들기"}
        </Button>
        {isAdmin && (
          <Button
            variant="ghost"
            size="lg"
            asChild={false}
            className="bg-bg-sub border-border-point cursor-pointer"
            onClick={() => setDialogOpen("admin")}
          >
            <CalendarClockIcon />
          </Button>
        )}
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
        onOpenChange={(open) => setDialogOpen(open ? "planner" : "")}
        concertDetail={concertDetail}
      />

      {/* 관리자용 : 티켓팅 일정 등록 */}
      <TicketingAdminDialog
        open={dialogOpen === "admin"}
        onOpenChange={(open) => setDialogOpen(open ? "admin" : "")}
        concertDetail={concertDetail}
      />
    </>
  );
}
