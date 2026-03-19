import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertArtistBadgesSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-5 w-14 md:h-6 md:w-16" />
      <Skeleton className="h-5 w-10 md:h-6 md:w-12" />
      <Skeleton className="h-5 w-16 md:h-6 md:w-20" />
    </div>
  );
}
