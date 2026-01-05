import ListSortClient from "@/components/concert/list/ListSortClient";
import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";
import ConcertCardSkeleton from "./ConcertCardSkeleton";

export default function ConcertListsSkeleton() {
  return (
    <section className="px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-9`)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-19" />
          </div>
          <ListSortClient />
        </div>
        {/* 콘서트 카드 영역 */}
        <div className="grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ConcertCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
