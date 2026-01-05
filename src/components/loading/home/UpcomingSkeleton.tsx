import { Skeleton } from "@/components/ui/skeleton";

export default function UpcomingSliderSkeleton() {
  return (
    <section className="w-full overflow-hidden py-10 md:py-15 lg:py-20">
      <div className="flex flex-col gap-6 px-5 lg:gap-10 lg:px-15">
        <div className="mx-auto flex w-full max-w-400 items-end justify-between gap-4">
          <div className="w-full space-y-2 md:w-auto">
            <Skeleton className="h-7 w-48 md:h-9 md:w-80 lg:w-96" />
            <Skeleton className="h-4 w-32 md:h-6 md:w-60 lg:w-80" />
          </div>

          <div className="hidden gap-4 md:flex">
            <Skeleton className="size-10 rounded-full md:size-12" />
            <Skeleton className="size-10 rounded-full md:size-12" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-400">
          <div className="w-full overflow-visible">
            <div className="flex">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative block w-auto! pr-3 last:pr-0 md:pr-4 lg:pr-8">
                  <div className="relative w-64 md:w-72 lg:w-80">
                    <Skeleton className="aspect-[320/426.5] w-full rounded-2xl" />
                    <div className="pointer-events-none absolute top-[58.8%] left-0 -mt-4 w-full">
                      <div className="bg-background absolute -left-4 h-8 w-8 rounded-full" />
                      <div className="bg-background absolute -right-4 h-8 w-8 rounded-full" />
                    </div>
                    <div className="pointer-events-none">
                      <div className="bg-background absolute -top-4 -left-4 h-8 w-8 rounded-full" />
                      <div className="bg-background absolute -top-4 -right-4 h-8 w-8 rounded-full" />
                      <div className="bg-background absolute -bottom-4 -left-4 h-8 w-8 rounded-full" />
                      <div className="bg-background absolute -right-4 -bottom-4 h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
