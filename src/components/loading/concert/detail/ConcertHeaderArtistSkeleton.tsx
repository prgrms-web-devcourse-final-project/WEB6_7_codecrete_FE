import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertHeaderArtistSkeleton() {
  return (
    <div className="about-Artist flex flex-col gap-3 lg:gap-4">
      <strong className="text-lg lg:text-xl">아티스트 정보</strong>
      <div className="flex flex-col gap-3 lg:gap-4">
        <div className="border-border flex justify-between border-b py-4 last:border-0">
          <div className="flex gap-4">
            <Skeleton className="ring-muted size-16 shrink-0 rounded-full ring-4" />
            <div className="space-y-1">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
          <Skeleton className="h-8 w-16 shrink-0" />
        </div>
      </div>
    </div>
  );
}
