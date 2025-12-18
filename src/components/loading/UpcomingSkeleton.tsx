import { Skeleton } from "../ui/skeleton";

export default function UpcomingSkeleton() {
  return (
    <section className="w-full overflow-hidden py-20">
      <div className="px-15">
        <div className="mx-auto mb-10 flex w-full max-w-400 items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-120" />
            <Skeleton className="h-6 w-120" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="size-12 rounded-full" />
          </div>
        </div>
        <div className="m-auto w-full max-w-400">
          <div className="w-full overflow-visible">
            <div className="flex">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group mr-8 w-auto! last:mr-0">
                  <div className="relative block w-80">
                    <Skeleton className="aspect-[320/426.5] w-full" />
                    {/* 티켓 각 모서리 꾸밈요소 */}
                    <div className="etc">
                      <div className="bg-bg-main absolute -top-4 -left-4 h-8 w-8 rounded-full"></div>
                      <div className="bg-bg-main absolute -top-4 -right-4 h-8 w-8 rounded-full"></div>
                      <div className="bg-bg-main absolute -bottom-4 -left-4 h-8 w-8 rounded-full"></div>
                      <div className="bg-bg-main absolute -right-4 -bottom-4 h-8 w-8 rounded-full"></div>
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
