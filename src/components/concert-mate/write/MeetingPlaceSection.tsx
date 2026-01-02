"use client";

import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MatePostWrite } from "@/types/community/concert-mate";
import { useFormContext } from "react-hook-form";

export default function MeetingPlaceSection() {
  // TODO : 글자수 제한 처리
  const { register } = useFormContext<MatePostWrite>();

  return (
    <CardContent className="flex flex-col gap-2">
      <CardTitle>약속 장소</CardTitle>
      <Input
        className="h-13"
        {...register("meetingPlace", { required: "장소를 입력해주세요" })}
        placeholder="예: 올림픽공원역 4번 출구 또는 공연장 A번 게이트"
      />
      <p className="text-text-sub text-xs">구체적인 장소를 명시해 주세요.</p>
    </CardContent>
  );
}
