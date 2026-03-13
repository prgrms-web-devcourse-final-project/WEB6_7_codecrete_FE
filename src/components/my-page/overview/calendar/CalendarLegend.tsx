import { cn } from "@/lib/utils";

interface CalendarLegendProps {
  isMobile: boolean;
}

export const CalendarLegend = ({ isMobile }: CalendarLegendProps) => (
  <ul
    className={cn(
      "*:text-text-main relative flex gap-3 *:flex *:items-center *:gap-1 *:font-medium *:before:size-2 *:before:rounded-full",
      isMobile ? "mt-3 flex-wrap text-[10px] leading-tight" : "mt-5 gap-4 *:gap-2"
    )}
  >
    <li className="before:bg-point-main">찜한 공연</li>
    <li className="before:border-point-main before:border md:before:border-2">
      찜한 아티스트 공연
    </li>
    <li className="before:bg-border">플래너 일정</li>
  </ul>
);
