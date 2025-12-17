import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function MeetingPlaceSection() {
  return (
    <CardContent className="flex flex-col gap-2">
      <CardTitle>약속 장소</CardTitle>
      <Input className="h-13" placeholder="예: 올림픽공원역 4번 출구 또는 공연장 A번 게이트" />
      <p className="text-text-sub text-xs">구체적인 장소를 명시해 주세요.</p>
    </CardContent>
  );
}
