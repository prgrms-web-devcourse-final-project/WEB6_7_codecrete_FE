"use client";

import { createContext, useContext, useState } from "react";
import { Calendar } from "../ui/calendar";
import { twMerge } from "tailwind-merge";
import { DayProps, MonthCaptionProps, useDayPicker } from "react-day-picker";
import { Button } from "../ui/button";
import { concertEvents, getConcertsByDate } from "@/data/concertData";
import { EventContextType } from "@/types/my-page";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import MyPageCalendarList from "./MyPageCalendarList";

const EventContext = createContext<EventContextType>({ events: {} });

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
  const { events, onDateClick } = useContext(EventContext);

  const dateKey = `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(2, "0")}`;
  const dayNumber = day.date.getDate();
  const eventCount = events[dateKey] || 0;

  return (
    <td className="border-r last:border-0">
      <Button
        variant="ghost"
        className={twMerge(
          "bg-bg-main flex aspect-square h-auto w-full flex-col items-start justify-start gap-2 rounded-none border-2 border-transparent p-4",
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
        {eventCount > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              {Array.from({ length: Math.min(eventCount, 2) }).map((_, i) => (
                <span key={i} className="bg-point-main size-2 rounded-full" />
              ))}
            </div>
            {eventCount > 2 && <span className="text-text-sub text-xs">+{eventCount - 2}</span>}
          </div>
        )}
      </Button>
    </td>
  );
};

export default function MyPageCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedConcerts = date
    ? getConcertsByDate(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      )
    : [];

  const handleDayClick = (clickedDate: Date) => {
    setDate(clickedDate);
  };

  return (
    <div className="flex-3 space-y-8">
      <section className="border-border w-full rounded-xl border p-8">
        <EventContext.Provider value={{ events: concertEvents, onDateClick: handleDayClick }}>
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
        </EventContext.Provider>
      </section>
      <MyPageCalendarList concerts={selectedConcerts} selectedDate={date as Date} />
    </div>
  );
}
