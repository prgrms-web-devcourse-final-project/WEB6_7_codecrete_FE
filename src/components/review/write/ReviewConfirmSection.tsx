import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";

export default function ReviewConfirmSection() {
  return (
    <CardContent className={"flex flex-col gap-4"}>
      <div className="bg-bg-sub flex w-full items-start gap-3 p-6">
        <Checkbox
          className={"bg-bg-main border-border-point"}
          id="review-confirm"
          type={"button"}
        />

        <Label htmlFor="review-confirm" className="text-text-main flex flex-col items-start">
          <span>
            본 리뷰는 직접 관람한 경험을 바탕으로 작성되었으며, 커뮤니티 가이드라인을 준수했음을
            확인합니다.
          </span>
          <span>허위 또는 오해를 유발하는 리뷰는 계정 이용에 제한이 있을 수 있습니다.</span>
        </Label>
      </div>
    </CardContent>
  );
}
