"use client";

import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarContext } from "./CalendarContext";
import { CustomCaption } from "./CustomCaption";
import { CustomDay } from "./CustomDay";
import { CalendarLegend } from "./CalendarLegend";
import type { ConcertWithTicket } from "@/types/my-page";
import type { PlannerListWithDetails } from "@/types/planner";
import { parseYMD, toYMD } from "@/utils/helpers/calendar";
import MyPageCalendarList from "../MyPageCalendarList";

interface MyPageCalendarProps {
  concerts: ConcertWithTicket[];
  planners: PlannerListWithDetails[];
}

export default function MyPageCalendar({ concerts, planners }: MyPageCalendarProps) {
  const [date, setDate] = useState<Date>(new Date());
  const isMobile = useIsMobile();

  // 날짜별 콘서트 맵 (시작~종료 전체 날짜 포함)
  const concertsByDate = useMemo(() => {
    const map: Record<string, ConcertWithTicket[]> = {};
    for (const concert of concerts) {
      const start = parseYMD(concert.startDate);
      const end = parseYMD(concert.endDate ?? concert.startDate);
      const cur = new Date(start);
      while (cur <= end) {
        const key = toYMD(cur);
        (map[key] ??= []).push(concert);
        cur.setDate(cur.getDate() + 1);
      }
    }
    return map;
  }, [concerts]);

  // 날짜별 콘서트 수
  const concertEvents = useMemo<Record<string, number>>(
    () => Object.fromEntries(Object.entries(concertsByDate).map(([key, val]) => [key, val.length])),
    [concertsByDate]
  );

  // 날짜별 플래너 수
  const scheduleEvents = useMemo<Record<string, number>>(
    () =>
      planners.reduce<Record<string, number>>((acc, { planDate }) => {
        acc[planDate] = (acc[planDate] ?? 0) + 1;
        return acc;
      }, {}),
    [planners]
  );

  const selectedDateKey = toYMD(date);

  const selectedConcerts = concertsByDate[selectedDateKey] ?? [];
  const selectedSchedules = planners.filter((s) => s.planDate === selectedDateKey);

  return (
    <div className="flex-3 space-y-8">
      <section
        className={cn(
          "w-full border",
          isMobile ? "border-x-0 py-8" : "border-border rounded-xl p-8"
        )}
      >
        <CalendarContext.Provider
          value={{
            events: concertEvents,
            schedules: scheduleEvents,
            concertsByDate,
            onDateClick: setDate,
            isMobile,
          }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            defaultMonth={date}
            className="relative w-full p-0"
            classNames={{
              month_caption: "hidden",
              nav: "hidden",
              month_grid: "flex flex-col overflow-hidden h-full",
              months: "",
              weekdays: twMerge(
                "grid grid-cols-7 border border-border border-b-0  rounded-t-lg",
                isMobile ? "p-1.5" : "p-3"
              ),
              week: "grid grid-cols-7  border-t",
              month: twMerge(
                isMobile
                  ? "flex flex-col gap-y-3 min-h-120 h-[calc(100vh-105px)] max-h-150"
                  : "gap-6 space-y-4"
              ),
              weeks:
                "overflow-hidden grid border-b h-full border border-t-0 border-border rounded-b-lg",
            }}
            components={{ MonthCaption: CustomCaption, Day: CustomDay }}
            formatters={{
              formatWeekdayName: (d) => d.toLocaleDateString("ko-KR", { weekday: "short" }),
            }}
          />
          {/* 캘린더 하단 범례 */}
          <CalendarLegend isMobile={isMobile} />
        </CalendarContext.Provider>
      </section>
      {/* 캘린더 날짜 선택 시 보여지는 일정 리스트 */}
      <MyPageCalendarList
        concerts={selectedConcerts}
        schedules={selectedSchedules}
        selectedDate={date}
      />
    </div>
  );
}
