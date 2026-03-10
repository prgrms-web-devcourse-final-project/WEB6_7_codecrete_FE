"use client";
import { ScheduleDot } from "@/types/my-page";
import { EventDot } from "./EventDot";

interface CalendarDotsProps {
  likedConcertCount: number;
  artistConcertCount: number;
  scheduleCount: number;
  isMobile: boolean;
}

const MAX_DOTS = 3;

/**
 * 캘린더 날짜 셀 이벤트 점 렌더링
 * 모바일/데스크톱 레이아웃 분기 처리
 *
 * @param likedConcertCount - 찜한 공연 수
 * @param artistConcertCount - 아티스트 공연 수
 * @param scheduleCount - 플래너 일정 수
 * @param isMobile - 모바일 여부
 */
export const CalendarDots = ({
  likedConcertCount,
  artistConcertCount,
  scheduleCount,
  isMobile,
}: CalendarDotsProps) => {
  const scheduleDots: ScheduleDot[] = [
    { count: likedConcertCount, className: "bg-point-main" },
    { count: artistConcertCount, className: "border-point-main border md:border-2" },
    { count: scheduleCount, className: "bg-border" },
  ];

  return (
    <>
      {scheduleDots.map(({ count, className }, index) =>
        count > 0 ? (
          <div key={index} className="flex items-center gap-0.5">
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(count, MAX_DOTS) }).map((_, i) => (
                <EventDot key={i} size={isMobile ? "sm" : "md"} className={className} />
              ))}
            </div>
            {count > MAX_DOTS && <span className="text-text-sub text-xs">+{count - MAX_DOTS}</span>}
          </div>
        ) : null
      )}
    </>
  );
};
