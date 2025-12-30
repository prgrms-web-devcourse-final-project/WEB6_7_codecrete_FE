import { Skeleton } from "@/components/ui/skeleton";

export default function PlannerTopHeaderSkeleton() {
  return (
    <header className="bg-linear-to-tr from-zinc-900 to-zinc-800 px-5 py-10 lg:px-15 lg:py-28">
      <div className="mx-auto max-w-400 space-y-4 lg:space-y-6">
        {/* 뒤로 가기 버튼 스켈레톤 */}
        <Skeleton className="h-6 w-20 rounded-md bg-zinc-700" />

        {/* 타이틀 영역 */}
        <div className="space-y-2 lg:space-y-3">
          {/* 제목 스켈레톤 */}
          <Skeleton className="h-7 w-1/3 rounded-md bg-zinc-700 lg:h-10" />

          {/* 공연 정보 스켈레톤 */}
          <Skeleton className="h-5 w-1/2 rounded-md bg-zinc-700 lg:h-6" />
        </div>

        {/* 기타 정보 스켈레톤 */}
        <div className="space-y-2 pt-2 lg:flex lg:gap-6 lg:space-y-0">
          {/* 공연 시간 */}
          <Skeleton className="h-5 w-32 rounded-md bg-zinc-700 lg:h-6" />

          {/* 장소 */}
          <Skeleton className="h-5 w-1/3 rounded-md bg-zinc-700 lg:h-6 lg:w-64" />
        </div>
      </div>
    </header>
  );
}
