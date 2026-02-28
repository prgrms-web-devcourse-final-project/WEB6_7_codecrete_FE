"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MatePostWrite } from "@/types/community/concert-mate";
import { useFormContext } from "react-hook-form";

export default function MeetingPlaceSection() {
  // TODO : 글자수 제한 처리
  const { register } = useFormContext<MatePostWrite>();

  return (
    <Field>
      <FieldLabel htmlFor="place">약속 장소 </FieldLabel>
      <Input
        id="place"
        {...register("meetingPlace")}
        placeholder="올림픽공원역 4번 출구 또는 공연장 A번 게이트"
      />
    </Field>
  );
}
