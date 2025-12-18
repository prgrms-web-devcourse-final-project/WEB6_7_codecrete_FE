"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/lib/zod/auth";
import FieldError from "@/components/auth/FieldError";

export default function AgreeField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  return (
    <div className="flex flex-col gap-1">
      <Controller
        name="agree"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="cursor-pointer"
            />
            <Label className="text-text-sub">서비스 약관 및 개인정보 처리방침에 동의합니다.</Label>
          </div>
        )}
      />
      {errors.agree && <FieldError message={errors.agree.message} />}
    </div>
  );
}
