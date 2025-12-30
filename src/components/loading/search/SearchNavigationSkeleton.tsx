import { Skeleton } from "@/components/ui/skeleton";

export default function SearchNavigationSkeleton() {
  return (
    <nav className="border-border border-y px-15">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        <Skeleton className="my-4 h-5 w-20" />
        <Skeleton className="my-4 h-5 w-20" />
        <Skeleton className="my-4 h-5 w-20" />
      </div>
    </nav>
  );
}
