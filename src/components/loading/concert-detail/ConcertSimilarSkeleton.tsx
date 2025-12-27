import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertSimilarSkeleton() {
  return (
    <section className="bg-bg-sub flex w-full flex-col gap-8 px-15 py-20">
      <div className="mx-auto flex w-full max-w-400 items-center justify-between">
        {/* 제목 영역 */}
        <div className="intro flex flex-col gap-1">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-5 w-64" />
        </div>

        {/* 버튼 영역 */}
        <div className="btn flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>

      {/* 카드 슬라이더 */}
      <div className="m-auto w-full max-w-400">
        <div className="flex gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-80 shrink-0">
              <div className="concert-card rounded-xl">
                {/* 포스터 이미지 */}
                <div className="relative">
                  <Skeleton className="aspect-3/2 w-full rounded-t-lg" />

                  {/* 하트 버튼 */}
                  <div className="absolute top-3 right-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                  </div>

                  {/* 장르 배지 */}
                  <div className="absolute bottom-3 left-3">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>

                {/* 카드 정보 */}
                <div className="bg-bg-main flex flex-col gap-3 rounded-b-lg p-4">
                  <Skeleton className="h-6 w-48" />

                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
