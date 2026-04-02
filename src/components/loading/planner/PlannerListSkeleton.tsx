import { Skeleton } from "@/components/ui/skeleton";

export default function PlannerListSkeleton() {
  return (
    <div className="border-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 block rounded-md border p-3 text-left">
      <Skeleton className="h-4 w-25 rounded-sm" />
      <div className="mt-2 space-y-1">
        <Skeleton className="h-3 w-60 rounded-sm" />
        <Skeleton className="h-3 w-32 rounded-sm" />
        <Skeleton className="h-3 w-35 rounded-sm" />
        <Skeleton className="h-3 w-15 rounded-sm" />
      </div>
    </div>
  );
}
