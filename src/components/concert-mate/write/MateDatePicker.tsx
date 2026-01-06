"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext, useWatch } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { MatePostWrite } from "@/types/community/concert-mate";
import { getConcertDetail } from "@/lib/api/concerts/concerts.client";

export function MateDatePicker() {
  const [open, setOpen] = React.useState(false);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  const { setValue, control } = useFormContext<MatePostWrite>();

  const meetingAt = useWatch({ control, name: "meetingAt" });
  const concertId = useWatch({ control, name: "concertId" });

  const [localTime, setLocalTime] = React.useState(
    meetingAt ? format(parseISO(meetingAt), "HH:mm") : "10:00"
  );

  const currentDate = meetingAt ? parseISO(meetingAt) : undefined;

  const update = (datePart: Date | undefined, timePart: string) => {
    if (!datePart) return;
    const ymd = format(datePart, "yyyy-MM-dd");
    const combined = `${ymd}T${timePart}:00`;
    setValue("meetingAt", combined);
  };

  // 콘서트 날짜 불러오기
  React.useEffect(() => {
    if (!concertId || concertId === 0) return;

    const fetchDetail = async () => {
      const data = await getConcertDetail({ concertId: concertId.toString() });
      setEndDate(data?.endDate || null);
    };
    fetchDetail();
  }, [concertId]);

  // 날짜 막기
  const isDateDisabled = React.useCallback(
    (date: Date) => {
      // 오늘 이전 막기
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) return true;
      // 콘서트 이후 막기
      if (endDate && date > new Date(endDate)) return true;
      return false;
    },
    [endDate]
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="h-13 w-full justify-between font-normal"
            >
              {currentDate ? format(currentDate, "yyyy-MM-dd") : "날짜를 입력하세요"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={currentDate}
              captionLayout="dropdown"
              disabled={isDateDisabled}
              onSelect={(date) => {
                update(date, localTime);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          step="60"
          value={localTime}
          onChange={(e) => {
            const newTime = e.target.value;
            setLocalTime(newTime);
            update(currentDate, newTime);
          }}
          className="bg-background h-13 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
