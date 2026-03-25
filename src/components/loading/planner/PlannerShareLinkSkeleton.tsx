import { Skeleton } from "@/components/ui/skeleton";

export default function PlannerShareLinkSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 w-32" />
    </div>
  );
}
