import { CardContent, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import ReviewDetailRating from "@/components/review/write/ReviewDetailRating";

export default function ReviewRatingSection() {
  return (
    <>
      <CardContent>
        <CardTitle className={"flex items-center justify-between"}>
          <CardTitle>
            종합 평점 <span className={"text-text-sub"}>*</span>
          </CardTitle>
          <div className={"flex"}>
            <Star fill="true" />
            <Star fill="true" />
            <Star fill="true" />
            <Star fill="true" />
            <Star />
          </div>
        </CardTitle>
      </CardContent>

      <CardContent className={"flex flex-col gap-4"}>
        <CardTitle>세부 평가</CardTitle>
        <ReviewDetailRating title={"퍼포먼스 완성도"} />
        <ReviewDetailRating title={"공연장 & 시설"} />
        <ReviewDetailRating title={"음향 퀄리티"} />
        <ReviewDetailRating title={"가격 대비 만족도"} />
      </CardContent>
    </>
  );
}
