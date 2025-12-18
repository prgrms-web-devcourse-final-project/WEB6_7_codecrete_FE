import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function MateTitleSection() {
  return (
    <CardContent className="flex flex-col gap-2">
      <CardTitle>
        구인 제목 <span className="text-text-sub">*</span>
      </CardTitle>
      <Input className="h-13" placeholder="제목을 입력해주세요" />
      <p className="text-text-sub text-xs">동행 구인의 목적을 한 문장으로 표현해보세요.</p>
    </CardContent>
  );
}
