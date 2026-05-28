import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BirthFieldProps } from "@/types/my-page";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function BirthField({ date, handleDateChange }: BirthFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <Field>
      <Label htmlFor="birth">생년월일</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* TODO : 저장된 생일 값이 잘 들어오고 있는지 확인 필요 */}
          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
            {date ? date.toLocaleDateString() : "생년월일을 입력하세요."}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              handleDateChange(date || null);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
