"use client";
import { MateDatePicker } from "@/components/concert-mate/write/MateDatePicker";
import { Field, FieldLabel } from "@/components/ui/field";

export default function MateTimeSection() {
  return (
    <Field className="flex flex-col gap-2">
      <FieldLabel htmlFor="meeting-time">약속 시간</FieldLabel>
      <MateDatePicker />
    </Field>
  );
}
