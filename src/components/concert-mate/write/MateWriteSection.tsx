"use client";

import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MatePostWrite } from "@/types/community/concert-mate";
import { useFormContext } from "react-hook-form";

export default function MateWriteSection() {
  // TODO : 글자수 제한 처리
  const {
    register,
    formState: { errors },
  } = useFormContext<MatePostWrite>();

  return (
    <CardContent>
      <div className="grid w-full gap-3">
        <Label htmlFor="content" className="gap-1">
          구인 작성 <span className="text-text-sub">*</span>
        </Label>
        <Textarea
          id="content"
          className="h-50 resize-none"
          placeholder="원하는 동행자 스타일, 함께 하고 싶은 활동 등을 자유롭게 적어주세요"
          {...register("content", { required: "글 내용을 입력해주세요" })}
        />
        {errors.content && (
          <span className="text-destructive text-xs">{errors.content.message}</span>
        )}
        <p className="text-text-sub text-xs">구체적인 내용은 매칭 확률을 올려줍니다.</p>
      </div>
    </CardContent>
  );
}
