import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { ReviewPostWrite } from "@/types/community/concert-review";

export default function ReviewConcertSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ReviewPostWrite>();

  return (
    <CardContent>
      <div className="grid w-full gap-3">
        <Label htmlFor="message-2" className={"gap-1"}>
          리뷰 작성<span className={"text-text-sub"}>*</span>
        </Label>
        <Textarea
          className={"h-50 resize-none"}
          placeholder="공연의 분위기, 무대 연출, 관객 반응까지 느꼈던 그대로 자유롭게 적어주세요."
          id="message-2"
          {...register("content", {
            required: "리뷰 내용은 필수 입력입니다.",
            minLength: {
              value: 30,
              message: "리뷰 내용은 최소 30자 이상 작성해주세요.",
            },
          })}
        />
        <p className="text-text-sub text-xs">
          최소 30자 이상 작성해주세요. 구체적인 후기는 다른 관객들에게 큰 도움이 됩니다.
        </p>
      </div>
      {errors.content?.message && (
        <span className="text-destructive text-xs">{errors.content.message}</span>
      )}
    </CardContent>
  );
}
