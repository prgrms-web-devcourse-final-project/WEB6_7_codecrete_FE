import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MateWriteSection() {
  return (
    <CardContent>
      <div className="grid w-full gap-3">
        <Label htmlFor="message-2" className="gap-1">
          구인 작성<span className="text-text-sub">*</span>
        </Label>
        <Textarea
          className="h-50 resize-none"
          placeholder="원하는 동행자 스타일, 함께 하고 싶은 활동 등을 자유롭게 적어주세요"
          id="message-2"
        />
        <p className="text-text-sub text-xs">
          최소 100자 이상 작성해주세요. 구체적인 내용은 매칭 확률을 올려줍니다.
        </p>
      </div>
    </CardContent>
  );
}
