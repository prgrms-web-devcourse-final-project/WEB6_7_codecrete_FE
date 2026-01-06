"use client";

import { CardContent } from "@/components/ui/card";
import { MateDatePicker } from "@/components/concert-mate/write/MateDatePicker";
import { Label } from "@/components/ui/label";

export default function MateTimeSection() {
  return (
    <CardContent className="flex flex-col gap-2">
      <Label htmlFor="meeting-time">약속 시간 (선택)</Label>
      <MateDatePicker />
      <p className="text-text-sub text-xs">구체적인 시간을 명시해 주세요.</p>
    </CardContent>
  );
}
