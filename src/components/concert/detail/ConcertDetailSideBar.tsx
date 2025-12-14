import { twMerge } from "tailwind-merge";
import { Bell, CalendarPlus2, ExternalLink, MessageSquare, Share2, Ticket } from "lucide-react";
import QuickActions from "@/components/concert/detail/QuickActions";

export default function ConcertDetailSideBar() {
  return (
    <div
      className={twMerge(`border-border sticky top-25 flex flex-col gap-4 rounded-xl border-2 p-6`)}
    >
      <h2 className="text-text-main text-xl font-bold">빠른 실행</h2>
      <div className="flex flex-col gap-3">
        <QuickActions Icon1={Ticket} text="티켓 예매하기" Icon2={ExternalLink} />
        <QuickActions Icon1={CalendarPlus2} text="플래너 만들기" />
        <QuickActions Icon1={Share2} text="공유하기" />
        <QuickActions Icon1={Bell} text="알림 설정하기" />
        <QuickActions Icon1={MessageSquare} text="채팅 참여하기" />
      </div>
    </div>
  );
}
