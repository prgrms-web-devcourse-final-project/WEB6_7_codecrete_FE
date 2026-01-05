import { CardContent, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ReviewPostWrite } from "@/types/community/concert-review";

// TODO: 별점은 커스텀 UI이므로 submit 실패 시(errors.rating) 자동 포커스가 불가함.
//       접근성 개선을 위해 추후 rating 영역(ref)으로 수동 focus 이동 처리 필요

export default function ReviewRatingSection() {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<ReviewPostWrite>();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const currentRating = hoverRating ?? rating;

  // TODO: controller를 활용해 수정 예정
  const ratingInput = (
    <input
      type="hidden"
      {...register("rating", {
        required: "별점은 최소 1점 이상 선택해주세요.",
        min: { value: 1, message: "별점은 최소 1점 이상이어야 합니다." },
      })}
    />
  );

  return (
    <CardContent>
      <CardTitle className="flex items-center justify-between">
        <span>
          종합 평점 <span className="text-text-sub">*</span>
        </span>
        <div className="flex flex-col">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              return (
                <button
                  key={value}
                  type="button"
                  className="cursor-pointer"
                  aria-label={`${value}점`}
                  onClick={() => {
                    setRating(value);
                    setValue("rating", value, { shouldValidate: true });
                    clearErrors("rating");
                  }}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(null)}
                >
                  <Star
                    className={`h-5 w-5 transition-colors ${value <= currentRating ? "text-yellow-400" : "text-gray-300"}`}
                    fill={value <= currentRating ? "currentColor" : "none"}
                    stroke="currentColor"
                  />
                </button>
              );
            })}
            {ratingInput}
          </div>
        </div>
      </CardTitle>
      {errors.rating && <span className="text-xs text-red-500">{errors.rating.message}</span>}
    </CardContent>
  );
}
