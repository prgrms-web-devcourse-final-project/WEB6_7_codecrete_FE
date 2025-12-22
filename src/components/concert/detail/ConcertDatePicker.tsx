import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ko } from "date-fns/locale";

type ConcertDatePickerProps = {
  startDate: Date;
  endDate: Date;
  className?: string;
};

export function ConcertDatePicker({ startDate, endDate, className }: ConcertDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="w-full justify-between font-normal">
          {date ? (
            date.toLocaleDateString("ko-KR")
          ) : (
            <span className="text-muted-foreground">날짜를 선택하세요</span>
          )}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
          disabled={(d) => d < startDate || d > endDate}
          className={cn("rounded-md border", className)}
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
}
