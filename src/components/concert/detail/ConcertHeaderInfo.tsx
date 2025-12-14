import { Calendar, MapPin, Ticket } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { twMerge } from "tailwind-merge";

export default function ConcertHeaderInfo() {
  return (
    <div className={twMerge(`info border-border grid grid-cols-2 gap-4 border-y py-4`)}>
      <div className="one flex gap-4">
        <Avatar
          className={twMerge(
            `ring-border bg-border flex size-10 items-center justify-center ring-4`
          )}
        >
          <Calendar />
        </Avatar>
        <div>
          <p className="text-text-sub text-sm">날짜 및 시간</p>
          <strong className="text-lg">2025년 12월 24일 수요일</strong>
          <p className="text-text-sub text-sm">8:00 PM - 11:00 PM</p>
        </div>
      </div>
      <div className="two flex gap-4">
        <Avatar
          className={twMerge(
            `ring-border bg-border flex size-10 items-center justify-center ring-4`
          )}
        >
          <MapPin />
        </Avatar>
        <div>
          <p className="text-text-sub text-sm">장소</p>
          <strong className="text-lg">KSPO DOME(올림픽체조경기장)</strong>
          <p className="text-text-sub text-sm">서울특별시 송파구 올림픽로 424</p>
        </div>
      </div>
      <div className="three flex gap-4">
        <Avatar
          className={twMerge(
            `ring-border bg-border flex size-10 items-center justify-center ring-4`
          )}
        >
          <Ticket />
        </Avatar>
        <div>
          <p className="text-text-sub text-sm">티켓 가격</p>
          <strong className="text-lg">₩ 121,000 - 161,000</strong>
          <p className="text-text-sub text-sm">지정석 - 스탠딩석</p>
        </div>
      </div>
      <div className="four flex gap-4">
        <Avatar
          className={twMerge(
            `ring-border bg-border flex size-10 items-center justify-center ring-4`
          )}
        >
          <Calendar />
        </Avatar>
        <div>
          <p className="text-text-sub text-sm">관람석</p>
          <strong className="text-lg">14,595석</strong>
          <p className="text-text-sub text-sm">12세 관람가</p>
        </div>
      </div>
    </div>
  );
}
