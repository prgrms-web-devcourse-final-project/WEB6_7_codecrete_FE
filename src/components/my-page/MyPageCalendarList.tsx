import { ConcertListProps } from "@/types/my-page";
import { MapPin, Clock, Ticket } from "lucide-react";
import { Button } from "../ui/button";

export default function MyPageCalendarList({ concerts, selectedDate }: ConcertListProps) {
  const dateStr = selectedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (concerts.length === 0) {
    return (
      <section className="space-y-4">
        <h3 className="text-xl font-bold">{dateStr}</h3>
        <p className="border-border text-text-sub rounded-lg border px-5 py-20 text-center">
          해당 날짜에 콘서트가 없습니다.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold">{dateStr}</h3>
      <div className="space-y-4">
        {concerts.map((concert) => (
          <div key={concert.id} className="border-border flex gap-5 rounded-lg border p-5">
            {/* 포스터 이미지 */}
            <div className="bg-bg-sub flex h-32 w-32 shrink-0 items-center justify-center rounded-lg">
              <span className="text-sm text-zinc-500">Concert Poster</span>
            </div>

            {/* 콘서트 정보 */}
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div className="space-y-2">
                <h4 className="text-xl font-bold">{concert.title}</h4>
                <div className="text-text-sub mt-2 space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{concert.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{concert.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket size={16} />
                    <span>{concert.priceRange}</span>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-2">
                <Button>상세보기</Button>
                <Button variant="outline">계획 추가하기</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
