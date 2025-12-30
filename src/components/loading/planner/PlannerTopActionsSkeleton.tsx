import { Skeleton } from "@/components/ui/skeleton";

export default function PlannerTopActionsSkeleton() {
  return (
    <>
      {/* 상단 액션 바 (데스크톱 보임) */}
      <section className="border-border hidden border-y px-5 py-4 lg:block lg:px-15">
        <div className="mx-auto max-w-400">
          <div className="flex justify-between gap-3">
            {/* 왼쪽 그룹: 추가, 초대, 지도 */}
            <div className="flex gap-4">
              <Skeleton className="h-9 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-9 w-25 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-9 w-25 rounded-md bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* 오른쪽 그룹: 공유, 저장 */}
            <div className="flex gap-4">
              <Skeleton className="h-9 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-9 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 모바일 액션 바 (모바일에서만 보임) */}
      <section className="border-border border-y px-5 py-4 lg:hidden">
        <div className="mx-auto max-w-400">
          <div className="flex gap-3">
            {/* 왼쪽 그룹: 3개 버튼 */}
            <div className="flex flex-1 gap-3">
              <Skeleton className="h-9 flex-1 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-9 flex-1 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-9 flex-1 rounded-md bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 모바일 하단 고정 버튼 (모바일에서만 보임) */}
      <div className="border-border bg-bg-main fixed right-0 bottom-0 left-0 z-50 border-t px-5 py-4 lg:hidden">
        <div className="mx-auto max-w-400">
          <div className="flex gap-3">
            <Skeleton className="h-9 flex-1 rounded-md bg-zinc-200 dark:bg-zinc-700" />
            <Skeleton className="h-9 flex-1 rounded-md bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </>
  );
}
