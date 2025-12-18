"use client";

import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@/components/auth/DatePicker";
import { SignUpFormValues } from "@/lib/zod/auth";
import { format, isValid, parse } from "date-fns";
import FieldError from "@/components/auth/FieldError";

function parseYyyyMmDd(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, "yyyy-MM-dd", new Date());
  return isValid(parsed) ? parsed : undefined;
}

function formatYyyyMmDd(date?: Date): string {
  return date ? format(date, "yyyy-MM-dd") : "";
}

export default function BirthField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  return (
    <div className="flex flex-col gap-2">
      <Controller
        name="birth"
        control={control}
        render={({ field }) => (
          <DatePicker
            value={parseYyyyMmDd(field.value)}
            onChange={(date) => field.onChange(formatYyyyMmDd(date))}
          />
        )}
      />

      {errors.birth && <FieldError message={errors.birth.message} />}
    </div>
  );
}
