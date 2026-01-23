"use client";

import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MatePostWrite } from "@/types/community/concert-mate";
import { useFormContext } from "react-hook-form";

export default function MateTitleSection() {
  // TODO : 글자수 제한 처리
  const {
    register,
    formState: { errors },
  } = useFormContext<MatePostWrite>();

  return (
    <CardContent className="flex flex-col gap-2">
      <div className="grid w-full gap-3">
        <Label htmlFor="title" className="gap-1">
          구인 제목 <span className="text-text-sub">*</span>
        </Label>
        <Input
          id="title"
          className="h-13"
          placeholder="제목을 입력해주세요"
          {...register("title", { required: "제목을 입력해주세요" })}
        />
        {errors.title && <span className="text-destructive text-xs">{errors.title.message}</span>}
        <p className="text-text-sub text-xs">동행 구인의 목적을 한 문장으로 표현해보세요.</p>
      </div>
    </CardContent>
  );
}
