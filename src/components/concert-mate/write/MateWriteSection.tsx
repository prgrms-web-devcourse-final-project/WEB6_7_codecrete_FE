"use client";
import { Field, FieldLabel } from "@/components/ui/field";
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
    <Field className="grid w-full gap-3">
      <FieldLabel htmlFor="content" className="gap-1">
        내용 <span className="text-text-sub">*</span>
      </FieldLabel>
      <Textarea
        id="content"
        className="min-h-100 resize-none text-sm"
        placeholder={`아래 내용을 참고해서 자유롭게 작성해보세요!

• 원하는 동행자 스타일 (조용한 편 / 같이 즐기는 편)
• 공연 전후 활동 계획 (식사, 굿즈 줄서기 등)
• 기타 전달하고 싶은 것`}
        {...register("content", { required: "글 내용을 입력해주세요" })}
      />
      {errors.content && <span className="text-destructive text-xs">{errors.content.message}</span>}
    </Field>
  );
}
