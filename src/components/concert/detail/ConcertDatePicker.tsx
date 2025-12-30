import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { isDateInRange } from "@/utils/helpers/handleDate";

type ConcertDatePickerProps = {
  startDate: Date;
  endDate: Date;
  className?: string;
  onChange: (date: Date | undefined) => void;
};

export function ConcertDatePicker({
  startDate,
  endDate,
  className,
  onChange,
}: ConcertDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      // 선택된 날짜를 그대로 사용 (브라우저에서 자정으로 설정됨)
      const normalizedDate = new Date(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate()
      );
      setDate(normalizedDate);
      onChange?.(normalizedDate);
    } else {
      setDate(undefined);
      onChange?.(undefined);
    }
    setOpen(false);
  };

  // 시작 월을 정규화
  const startMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className={cn("w-full justify-between font-normal", !date && "text-muted-foreground")}
        >
          {date ? format(date, "yyyy년 MM월 dd일", { locale: ko }) : <span>날짜를 선택하세요</span>}
          <CalendarIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          defaultMonth={startMonth}
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(d) => !isDateInRange({ d, startDate, endDate })} // 범위 체크
          className={cn("rounded-md border", className)}
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
}
