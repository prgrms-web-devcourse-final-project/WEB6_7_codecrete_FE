"use client";

import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MatePostWrite } from "@/types/community/concert-mate";
import { useFormContext } from "react-hook-form";

export default function MeetingPlaceSection() {
  // TODO : 글자수 제한 처리
  const { register } = useFormContext<MatePostWrite>();

  return (
    <CardContent className="flex flex-col gap-2">
      <Label htmlFor="place">약속 장소</Label>
      <Input
        id="place"
        className="h-13"
        {...register("meetingPlace")}
        placeholder="예: 올림픽공원역 4번 출구 또는 공연장 A번 게이트"
      />
      <p className="text-text-sub text-xs">구체적인 장소를 명시해 주세요.</p>
    </CardContent>
  );
}
