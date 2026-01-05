import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertHeaderSkeleton() {
  return (
    <section className="header bg-bg-sub px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 items-start gap-8">
        <div className="w-2/5">
          <Skeleton className="aspect-[320/426.5] rounded-2xl" />
        </div>
        <div className="border-border bg-bg-main flex-1 rounded-2xl border p-10">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div className="flex-1 space-y-4">
                {/* 장르 배지 */}
                <Skeleton className="h-6 w-16" />
                {/* 제목 */}
                <div className="space-y-2">
                  <Skeleton className="h-10 w-3/4" />
                </div>
              </div>
              {/* 좋아요 버튼 */}
              <Skeleton className="size-9 rounded-lg" />
            </div>
            {/* 정보 */}
            <div className="border-border grid grid-cols-2 gap-x-4 gap-y-6 border-y py-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
            </div>
            {/* 아티스트 */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="flex flex-1 justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-5.5 w-32" />
                    <Skeleton className="h-5 w-24" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-18" />
                </div>
              </div>
            </div>
            {/* 버튼 */}
            <div className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
