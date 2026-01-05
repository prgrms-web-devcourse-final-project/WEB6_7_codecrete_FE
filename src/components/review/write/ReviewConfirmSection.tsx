import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { PostConfirmSectionProps } from "@/types/community";

/*
 * TODO: 리뷰 작성 동의 체크 기능 구현
 *
 * - 동의 여부(isConfirmed: boolean)는 부모 컴포넌트에서 상태 관리
 *
 * - ReviewConfirmSection은
 *   - checked
 *   - onCheckedChange
 *   를 props로 전달받는 controlled checkbox로 변경
 *
 * Props 예시:
 * type ReviewConfirmSectionProps = {
 *   checked: boolean;
 *   onChange: (checked: boolean) => void;
 * };
 *
 * - 동의하지 않은 경우
 *   - 리뷰 제출 버튼 비활성화
 *   - 또는 제출 시 validation 에러 처리
 */

export default function ReviewConfirmSection({ checked, onChange }: PostConfirmSectionProps) {
  return (
    <CardContent className={"flex flex-col gap-4"}>
      <div className="bg-bg-sub flex w-full items-start gap-3 p-6">
        <Checkbox
          className={"bg-bg-main border-border-point"}
          id="review-confirm"
          type={"button"}
          checked={checked}
          onCheckedChange={onChange}
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
