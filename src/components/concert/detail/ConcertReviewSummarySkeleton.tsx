import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertReviewSummarySkeleton() {
  return (
    <>
      <div className="bg-bg-sub flex flex-col gap-6 rounded-xl p-6">
        <div className="flex justify-between">
          {/* 왼쪽: 평균 별점 영역 */}
          <div className="flex gap-4">
            {/* 평균 점수 */}
            <Skeleton className="h-10 w-14 rounded-md" />

            <div className="flex flex-col gap-2">
              {/* 별점 5개 */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-5 rounded-sm" />
                ))}
              </div>

              {/* 리뷰 개수 */}
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* 오른쪽: 리뷰 작성 버튼 */}
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        {/* RatingBar */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-sm" />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-border flex flex-col gap-4 rounded-xl border-2 p-6">
            {/* 상단 */}
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-20" />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4 rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
              <Skeleton className="h-4 w-8" />
            </div>

            {/* 본문 */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* 태그 */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
