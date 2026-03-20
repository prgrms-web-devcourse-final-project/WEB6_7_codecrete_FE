import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertDetailVenueSkeleton() {
  return (
    <div className="space-y-4 px-5 lg:space-y-6 lg:px-0">
      <Skeleton className="h-7 w-32 lg:h-8 lg:w-40" />
      <div className="bg-bg-sub flex flex-col gap-4 rounded-xl p-4 lg:gap-6 lg:p-6">
        <div className="space-y-2 lg:space-y-3">
          <Skeleton className="h-6 w-48 lg:h-7 lg:w-64" />
          <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm">
            <Skeleton className="col-span-2 h-4 w-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="border-accent rounded-xl border">
          <Skeleton className="h-[360px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
