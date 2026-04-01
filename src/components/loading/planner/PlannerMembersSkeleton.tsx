import { Skeleton } from "@/components/ui/skeleton";

export default function PlannerMembersSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="bg-muted/40 border-input flex animate-pulse items-center justify-between gap-4 rounded-2xl border px-4 py-3"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      ))}
    </div>
  );
}
