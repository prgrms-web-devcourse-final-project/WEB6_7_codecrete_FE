import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      {/* 이미지 영역 */}
      <Skeleton className="aspect-3/4 rounded-lg" />
      {/* 제목 및. 정보 영역 */}
      <div className="flex flex-col gap-1 lg:gap-3">
        <Skeleton className="h-6 w-full md:h-7 xl:h-8" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
