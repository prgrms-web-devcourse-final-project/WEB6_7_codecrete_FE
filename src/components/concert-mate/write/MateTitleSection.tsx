"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MatePostWrite } from "@/types/community/concert-mate";
import { useFormContext } from "react-hook-form";

export default function MateTitleSection() {
  // TODO : 글자수 제한 처리
  const {
    register,
    formState: { errors },
  } = useFormContext<MatePostWrite>();

  return (
    <Field className="flex flex-col gap-2">
      <div className="grid w-full gap-3">
        <FieldLabel htmlFor="title" className="gap-1">
          제목 <span className="text-text-sub">*</span>
        </FieldLabel>
        <Input
          id="title"
          placeholder="ex) 아이유 콘서트 같이 떼창할 Mate 구해요!"
          {...register("title", { required: "제목을 입력해주세요" })}
        />
        {errors.title && <span className="text-destructive text-xs">{errors.title.message}</span>}
      </div>
    </Field>
  );
}
