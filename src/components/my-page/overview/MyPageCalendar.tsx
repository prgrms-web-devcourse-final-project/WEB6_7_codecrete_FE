"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { Calendar } from "../../ui/calendar";
import { twMerge } from "tailwind-merge";
import { DayProps, MonthCaptionProps, useDayPicker } from "react-day-picker";
import { Button } from "../../ui/button";
import { EventContextType } from "@/types/my-page";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import MyPageCalendarList from "./MyPageCalendarList";
import { ConcertWithTicket } from "@/types/my-page";
import { PlannerListWithDetails } from "@/types/planner";

const EventContext = createContext<EventContextType>({
  events: {},
  schedules: {},
  onDateClick: undefined,
});

// 커스텀 요일 네비게이션 컴포넌트
const CustomCaption = (props: MonthCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  const handlePreviousMonth = () => {
    if (previousMonth) goToMonth(previousMonth);
  };

  const handleNextMonth = () => {
    if (nextMonth) goToMonth(nextMonth);
  };

  const handleToday = () => {
    goToMonth(new Date());
  };

  // 날짜 포맷
  const monthYear = props.calendarMonth.date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="text-2xl font-bold">{monthYear}</h2>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousMonth}
          disabled={!previousMonth}
          className="h-8 w-8"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" onClick={handleToday} className="h-8 px-4">
          Today
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
          disabled={!nextMonth}
          className="h-8 w-8"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// 커스텀 날짜 버튼 컴포넌트
const CustomDay = (props: DayProps) => {
  const { day, modifiers } = props;
  const { schedules, onDateClick, concertsByDate } = useContext(EventContext);

  const dateKey = `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(2, "0")}`;
  const dayNumber = day.date.getDate();

  const scheduleCount = schedules[dateKey] || 0; // 플래너 일정 개수 (필요시 데이터 연동)

  // 해당 날짜의 콘서트 구분 (찜한 공연 / 아티스트 공연)
  const concertsOnDate = concertsByDate?.[dateKey] || [];
  const likedConcertCount = concertsOnDate.filter((c) => !c.isLikedArtistConcert).length;
  const artistConcertCount = concertsOnDate.filter((c) => c.isLikedArtistConcert).length;

  return (
    <td className="border-r last:border-0">
      <Button
        variant="ghost"
        className={twMerge(
          "bg-bg-main flex aspect-square h-full w-full flex-col items-start justify-start gap-2 rounded-none border-2 border-transparent p-4",
          modifiers.selected && "border-border-point",
          modifiers.outside && "opacity-50",
          modifiers.disabled && "cursor-not-allowed opacity-30",
          modifiers.today && "bg-bg-sub"
        )}
        disabled={modifiers.disabled}
        aria-label={dateKey}
        aria-selected={modifiers.selected || undefined}
        aria-current={modifiers.today ? "date" : undefined}
        onClick={() => {
          if (!modifiers.disabled && !modifiers.outside) {
            onDateClick?.(day.date);
          }
        }}
      >
        <strong className="text-point-main text-sm font-normal">{dayNumber}</strong>
        {modifiers.today && <span className="text-text-sub text-xs">Today</span>}
        {/* 찜한 공연 점 (빨간색) */}
        {likedConcertCount > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              {Array.from({ length: Math.min(likedConcertCount, 3) }).map((_, i) => (
                <span key={i} className="bg-point-main size-2 rounded-full" />
              ))}
            </div>
            {likedConcertCount > 3 && (
              <span className="text-text-sub text-xs">+{likedConcertCount - 3}</span>
            )}
          </div>
        )}
        {/* 아티스트 공연 점 */}
        {artistConcertCount > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              {Array.from({ length: Math.min(artistConcertCount, 3) }).map((_, i) => (
                <span key={i} className="border-point-main size-2 rounded-full border-2" />
              ))}
            </div>
            {artistConcertCount > 3 && (
              <span className="text-text-sub text-xs">+{artistConcertCount - 3}</span>
            )}
          </div>
        )}
        {/* 플래너 점 */}
        {scheduleCount > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              {Array.from({ length: Math.min(scheduleCount, 3) }).map((_, i) => (
                <span key={i} className="bg-border size-2 rounded-full" />
              ))}
            </div>
            {scheduleCount > 3 && (
              <span className="text-text-sub text-xs">+{scheduleCount - 3}</span>
            )}
          </div>
        )}
      </Button>
    </td>
  );
};

export default function MyPageCalendar({
  concerts,
  planners,
}: {
  concerts: ConcertWithTicket[];
  planners: PlannerListWithDetails[];
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // 날짜 유틸: YYYY-MM-DD로 포맷 (로컬 기준)
  const toYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // 안전한 파서: UTC 오프셋 문제를 피하기 위해 로컬 Date 생성
  const parseYMD = (s: string) => {
    const [y, m, d] = s.split("-").map((v) => parseInt(v, 10));
    const dt = new Date();
    dt.setFullYear(y);
    dt.setMonth((m || 1) - 1);
    dt.setDate(d || 1);
    dt.setHours(0, 0, 0, 0);
    return dt;
  };

  // 날짜별 콘서트 목록을 메모이즈 (시작~종료일 전체 포함)
  const concertsByDate = useMemo(() => {
    const map: Record<string, ConcertWithTicket[]> = {};
    concerts.forEach((concert) => {
      const start = parseYMD(concert.startDate);
      const end = parseYMD(concert.endDate ?? concert.startDate);
      const cur = new Date(start);
      while (cur.getTime() <= end.getTime()) {
        const key = toYMD(cur);
        if (!map[key]) map[key] = [];
        map[key].push(concert);
        cur.setDate(cur.getDate() + 1);
      }
    });
    return map;
  }, [concerts]);

  // 콘서트 날짜별 이벤트 카운트는 맵에서 길이로 산출
  const concertEvents: Record<string, number> = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const key in concertsByDate) {
      acc[key] = concertsByDate[key].length;
    }
    return acc;
  }, [concertsByDate]);

  // 특정 날짜의 콘서트 목록 가져오기
  const getConcertsByDate = (dateStr: string): ConcertWithTicket[] => {
    return concertsByDate[dateStr] ?? [];
  };

  // 특정 날짜의 사용자 일정 가져오기
  const getSchedulesByDate = (dateStr: string): PlannerListWithDetails[] => {
    return planners?.filter((schedule) => schedule.planDate === dateStr) ?? [];
  };

  // 캘린더 표시용 - 일정이 있는 날짜
  const scheduleEvents: Record<string, number> = planners.reduce(
    (acc, schedule) => {
      acc[schedule.planDate] = (acc[schedule.planDate] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const selectedConcerts = date
    ? getConcertsByDate(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      )
    : [];

  const selectedSchedules = date
    ? getSchedulesByDate(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      )
    : [];

  const handleDayClick = (clickedDate: Date) => {
    setDate(clickedDate);
  };

  return (
    <div className="flex-3 space-y-8">
      <section className="border-border w-full rounded-xl border p-8">
        <EventContext.Provider
          value={{
            events: concertEvents,
            schedules: scheduleEvents,
            onDateClick: handleDayClick,
            concertsByDate,
          }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            onDayClick={(day) => {
              setDate(day);
            }}
            defaultMonth={date}
            className={twMerge("w-full p-0")}
            classNames={{
              month_caption: "hidden",
              nav: "hidden",
              month_grid: "grid overflow-hidden rounded-lg border border-border",
              months: "*:gap-6",
              weekdays: "grid grid-cols-7 p-3",
              week: "grid grid-cols-7 border-t",
            }}
            components={{
              MonthCaption: CustomCaption,
              Day: CustomDay,
            }}
            formatters={{
              formatWeekdayName: (date) => {
                return date.toLocaleDateString("ko-KR", { weekday: "short" });
              },
            }}
          />
          <ul className="*:text-text-main mt-5 flex gap-4 *:flex *:items-center *:gap-2 *:font-medium *:before:size-2 *:before:rounded-full">
            <li className="before:bg-point-main">찜한 공연</li>
            <li className="before:border-point-main before:border-2">찜한 아티스트 공연</li>
            <li className="before:bg-border">플래너 일정</li>
          </ul>
        </EventContext.Provider>
      </section>
      <MyPageCalendarList
        concerts={selectedConcerts}
        schedules={selectedSchedules}
        selectedDate={date as Date}
      />
    </div>
  );
}
