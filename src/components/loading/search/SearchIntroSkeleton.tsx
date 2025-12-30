import { Skeleton } from "@/components/ui/skeleton";

export default function SearchIntroSkeleton() {
  return (
    <section className="bg-bg-sub px-15 py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-4">
        <Skeleton className="h-10 w-35" />
        <Skeleton className="h-6 w-60" />
      </div>
    </section>
  );
}
