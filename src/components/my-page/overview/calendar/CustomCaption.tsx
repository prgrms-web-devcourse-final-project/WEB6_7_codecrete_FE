"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { MonthCaptionProps, useDayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useCalendarContext } from "./CalendarContext";

export const CustomCaption = ({ calendarMonth }: MonthCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const { isMobile } = useCalendarContext();

  const monthYear = calendarMonth.date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="flex w-full items-center justify-between">
      <h2 className={cn("font-bold", isMobile ? "text-base" : "text-2xl")}>{monthYear}</h2>
      <div className="flex items-center gap-1">
        <NavButton
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          isMobile={isMobile}
          icon={<ChevronLeftIcon className={cn(isMobile ? "size-3" : "size-4")} />}
          aria-label="이전 달"
        />
        <Button
          variant="ghost"
          onClick={() => goToMonth(new Date())}
          className={cn(isMobile ? "h-6 px-2 text-xs" : "h-8 px-4")}
        >
          Today
        </Button>
        <NavButton
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          isMobile={isMobile}
          icon={<ChevronRightIcon className={cn(isMobile ? "size-3" : "size-4")} />}
          aria-label="다음 달"
        />
      </div>
    </div>
  );
};

// 좌우 네비게이션
const NavButton = ({
  onClick,
  disabled,
  isMobile,
  icon,
  "aria-label": ariaLabel,
}: {
  onClick: () => void;
  disabled: boolean;
  isMobile: boolean;
  icon: React.ReactNode;
  "aria-label": string;
}) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    className={cn(isMobile ? "size-6" : "size-8")}
    aria-label={ariaLabel}
  >
    {icon}
  </Button>
);
