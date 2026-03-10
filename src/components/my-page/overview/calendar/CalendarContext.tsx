import { createContext, useContext } from "react";
import type { ConcertWithTicket } from "@/types/my-page";

export interface CalendarContextType {
  events: Record<string, number>;
  schedules: Record<string, number>;
  concertsByDate: Record<string, ConcertWithTicket[]>;
  onDateClick?: (date: Date) => void;
  isMobile: boolean;
}

export const CalendarContext = createContext<CalendarContextType>({
  events: {},
  schedules: {},
  concertsByDate: {},
  onDateClick: undefined,
  isMobile: false,
});

export const useCalendarContext = () => useContext(CalendarContext);
