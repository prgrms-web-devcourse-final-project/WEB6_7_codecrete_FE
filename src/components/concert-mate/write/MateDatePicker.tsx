"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { MatePostWrite } from "@/types/community/concert-mate";
import { format, parseISO } from "date-fns";

export function MateDatePicker() {
  // 필요한 결과값 meetingAt: "2025-01-05T18:30:00"
  const [open, setOpen] = React.useState(false);

  const { setValue, watch } = useFormContext<MatePostWrite>();

  const meetingAt = watch("meetingAt");
  // console.log(`기지국 추적값 : ${meetingAt}`);

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
