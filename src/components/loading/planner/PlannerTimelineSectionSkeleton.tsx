import { Skeleton } from "@/components/ui/skeleton";

export default function PlannerTimelineSectionSkeleton() {
  return (
    <section className="bg-bg-sub px-5 py-8 lg:px-15 lg:py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        {/* === 메인 타임라인 영역 === */}
        <div className="*:bg-bg-main *:border-border w-full flex-1 space-y-6 *:rounded-2xl *:border *:p-5 lg:flex-3 lg:space-y-8 lg:*:p-8">
          {/* 타임라인 헤더 */}
          <div className="space-y-6 lg:space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Skeleton className="h-8 w-32 rounded-md bg-zinc-200 lg:h-10 dark:bg-zinc-700" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20 rounded-md bg-zinc-200 dark:bg-zinc-700" />
                <Skeleton className="h-6 w-16 rounded-md bg-zinc-200 lg:h-7 dark:bg-zinc-700" />
              </div>
            </div>

            {/* 타임라인 */}
            <div className="before:bg-bg-sub relative space-y-6 before:absolute before:top-0 before:left-4 before:h-full before:w-0.5 lg:space-y-8 lg:before:left-8">
              <div className="relative space-y-6 lg:space-y-8">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="relative pl-12 lg:pl-20">
                    <Skeleton className="absolute top-0 left-0 h-8 w-8 rounded-full bg-zinc-200 lg:h-16 lg:w-16 dark:bg-zinc-700" />
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <Skeleton className="h-6 w-40 rounded-md bg-zinc-200 lg:h-7 dark:bg-zinc-700" />
                        <Skeleton className="h-5 w-20 rounded-md bg-zinc-200 dark:bg-zinc-700" />
                      </div>
                      <Skeleton className="h-4 w-full rounded-md bg-zinc-200 dark:bg-zinc-700" />
                      <Skeleton className="h-4 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 꿀팁 섹션 */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-4 w-5/6 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-4 w-4/5 rounded-md bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* === 데스크톱 사이드바 === */}
        <div className="hidden lg:block lg:max-w-125 lg:flex-1">
          <div className="sticky top-30 space-y-8">
            {/* 지도 카드 */}
            <div className="border-border bg-bg-main space-y-4 rounded-2xl border p-8">
              <Skeleton className="h-7 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-48 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* 친구 초대 카드 */}
            <div className="border-border bg-bg-main space-y-4 rounded-2xl border p-8">
              <Skeleton className="h-7 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-10 w-full rounded-md bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* 주변 맛집 카드 */}
            <div className="border-border bg-bg-main space-y-4 rounded-2xl border p-8">
              <Skeleton className="h-7 w-28 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded-md bg-zinc-200 dark:bg-zinc-700" />
                <Skeleton className="h-12 w-full rounded-md bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
