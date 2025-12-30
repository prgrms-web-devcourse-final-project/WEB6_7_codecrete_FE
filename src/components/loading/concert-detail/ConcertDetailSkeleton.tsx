import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertDetailSkeleton() {
  return (
    <section className="bg-bg-main px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 gap-12">
        {/* 왼쪽 메인 컨텐츠 */}
        <div className="flex-2 space-y-20">
          {/* 공연 이미지 */}
          <div className="space-y-6">
            <Skeleton className="h-200 w-full rounded-xl" />
          </div>

          {/* 공연장 정보 */}
          <div className="space-y-6">
            <Skeleton className="h-9 w-40" />
            <div className="bg-bg-sub flex flex-col gap-6 rounded-xl p-6">
              <div className="flex flex-col gap-4">
                <Skeleton className="h-7 w-48" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          </div>

          {/* 리뷰 */}
          <div className="flex flex-col gap-6">
            <Skeleton className="h-9 w-36" />

            {/* 별점 요약 */}
            <div className="bg-bg-sub flex flex-col gap-6 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-16" />
                  <div className="space-y-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-5 w-5" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>

              {/* 별점 분포 */}
              <div className="flex w-full flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-2 flex-1 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </div>

            {/* 리뷰 카드들 */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-border flex flex-col gap-4 rounded-xl border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-24" />
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Skeleton key={j} className="h-4 w-4" />
                          ))}
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-6 w-32 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            ))}

            {/* 더보기 버튼 */}
            <div className="flex justify-center">
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <div className="relative flex-1">
          <div className="border-border sticky top-34 flex flex-col gap-4 rounded-xl border p-6">
            <Skeleton className="h-7 w-24" />
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-11 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
