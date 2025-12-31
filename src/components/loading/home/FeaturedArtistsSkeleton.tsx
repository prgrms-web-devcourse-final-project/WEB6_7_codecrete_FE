import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function FeaturedArtistsSkeleton() {
  return (
    <section className="bg-bg-sub w-full overflow-hidden px-5 py-10 md:py-15 lg:px-15 lg:py-20">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-6 lg:gap-10">
        <div className="flex items-end justify-between gap-4">
          <div className="w-full max-w-lg space-y-2">
            <Skeleton className="h-8 w-3/4 max-w-80 md:h-9 md:w-96" />
            <Skeleton className="h-5 w-1/2 max-w-60 md:h-6 md:w-72" />
          </div>

          {/* 네비게이션 버튼 영역 (모바일 숨김, 데스크탑 노출) */}
          <div className="hidden gap-4 md:flex">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="size-12 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                index >= 2 && "hidden sm:block",
                index >= 3 && "sm:hidden lg:block",
                index >= 4 && "lg:hidden xl:block"
              )}
            >
              <Card className="flex h-full flex-col items-center gap-3 p-4 text-center shadow-none md:gap-4 md:p-6 lg:p-8">
                <Skeleton className="size-20 rounded-full md:size-24 lg:size-30" />
                <div className="flex w-full flex-col items-center space-y-2 py-1">
                  <Skeleton className="h-6 w-3/4 md:h-7" />
                  <Skeleton className="h-3 w-1/2 md:h-4" />
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <Skeleton className="size-3 rounded-full md:size-3.5" />
                  <Skeleton className="h-3 w-16 md:h-4" />
                </div>
                <Skeleton className="mt-1 h-9 w-full rounded-md md:h-10" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
