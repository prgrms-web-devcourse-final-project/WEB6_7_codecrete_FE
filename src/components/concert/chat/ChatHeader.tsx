import { ArrowLeft, Calendar } from "lucide-react";
import InfoBadge from "@/components/concert/chat/InfoBadge";

export default function ChatHeader() {
  return (
    <header className={`bg-bg-main flex gap-8`}>
      <div className={"flex w-full justify-between px-8 py-4"}>
        {/*헤더 좌측*/}
        <div className={"flex items-center gap-7"}>
          <button className={"cursor-pointer"} type={"button"} aria-label={"뒤로가기"}>
            <ArrowLeft />
          </button>
          <div className={"flex flex-col"}>
            <h2 className={"text-xl font-bold"}>The Midnight Echo Live</h2>
            <h3 className={"text-text-sub"}>Live Chat Room</h3>
          </div>
        </div>
        {/*헤더 우측*/}
        <div className={"inline-flex gap-6 px-2 py-3"}>
          {/*날짜*/}
          <InfoBadge>
            <Calendar size={14} className={"text-text-sub"} />
            <span className="leading-5 font-medium">2025. 12. 08</span>
          </InfoBadge>
          {/*인원*/}
          <InfoBadge>
            <span className="bg-text-sub/80 h-2 w-2 rounded-full" />
            <span className="leading-5 font-medium">328</span>
          </InfoBadge>
        </div>
      </div>
    </header>
  );
}
