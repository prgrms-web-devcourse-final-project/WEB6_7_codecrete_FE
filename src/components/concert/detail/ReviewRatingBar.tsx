import { Progress } from "@/components/ui/progress";
import { RatingDistribution } from "@/types/community/concert-review";

interface ReviewRatingBarProps {
  ratingDistribution: RatingDistribution;
  totalCount: number;
}

export default function ReviewRatingBar({ ratingDistribution, totalCount }: ReviewRatingBarProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {([5, 4, 3, 2, 1] as const).map((score) => {
        const count = ratingDistribution[score];
        const percent = totalCount === 0 ? 0 : Math.round((count / totalCount) * 100);

        return (
          <div key={score} className="flex items-center gap-2">
            {/* 왼쪽 점수 (고정 폭) */}
            <p className="text-text-sub w-8 shrink-0 text-center text-sm">{score}점</p>

            {/* Progress (남은 영역 꽉 채우기) */}
            <Progress value={percent} className="mx-2 flex-1" />

            {/* 오른쪽 개수 (고정 폭, 우측 정렬) */}
            <p className="text-text-sub w-8 shrink-0 text-center text-sm">
              {count.toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}
