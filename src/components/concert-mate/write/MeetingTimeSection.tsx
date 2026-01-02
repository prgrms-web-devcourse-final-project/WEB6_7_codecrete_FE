"use client";

import { CardContent, CardTitle } from "@/components/ui/card";
import { MateDatePicker } from "@/components/concert-mate/write/MateDatePicker";

export default function MateTimeSection() {
  return (
    <CardContent className="flex flex-col gap-2">
      <CardTitle>약속 시간</CardTitle>
      <MateDatePicker />
      <p className="text-text-sub text-xs">구체적인 시간을 명시해 주세요.</p>
    </CardContent>
  );
}
