"use client";

import { DayProps } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCalendarContext } from "./CalendarContext";
import { toYMD } from "@/utils/helpers/calendar";
import { CalendarDots } from "./CalendarDots";

export const CustomDay = ({ day, modifiers }: DayProps) => {
  const { schedules, onDateClick, concertsByDate, isMobile } = useCalendarContext();

  const dateKey = toYMD(day.date);
  const dayNumber = day.date.getDate();

  const concertsOnDate = concertsByDate[dateKey] ?? [];
  const likedConcertCount = concertsOnDate.filter((c) => !c.isLikedArtistConcert).length;
  const artistConcertCount = concertsOnDate.filter((c) => c.isLikedArtistConcert).length;
  const scheduleCount = schedules[dateKey] ?? 0;

  const isDisabledOrOutside = modifiers.disabled || modifiers.outside;

  return (
    <td className="border-r last:border-0">
      <Button
        variant="ghost"
        className={cn(
          "bg-bg-main flex h-full w-full flex-col items-start justify-start rounded-none border-2 border-transparent md:aspect-square",
          isMobile ? "gap-0.5 p-1" : "gap-1 lg:p-2 xl:p-4",
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
          if (!isDisabledOrOutside) onDateClick?.(day.date);
        }}
      >
        <strong className={cn("text-point-main font-normal", isMobile ? "text-xs" : "text-sm")}>
          {dayNumber}
        </strong>
        {modifiers.today && !isMobile && <span className="text-text-sub text-xs">Today</span>}
        <CalendarDots
          likedConcertCount={likedConcertCount}
          artistConcertCount={artistConcertCount}
          scheduleCount={scheduleCount}
          isMobile={isMobile}
        />
      </Button>
    </td>
  );
};
