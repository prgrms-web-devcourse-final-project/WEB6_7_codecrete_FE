import PlannerTopHeaderSkeleton from "@/components/loading/planner/PlannerTopHeaderSkeleton";
import PlannerTopActionsSkeleton from "@/components/loading/planner/PlannerTopActionsSkeleton";
import PlannerTimelineSectionSkeleton from "@/components/loading/planner/PlannerTimelineSectionSkeleton";
import PlannerList from "@/components/planner/list/PlannerList";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/queries/planner";
import { getPlanList } from "@/lib/api/planner/planner.server";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: plannerQueryKeys.list(),
    queryFn: getPlanList,
  });

  return (
    <>
      <PlannerTopHeaderSkeleton />
      <PlannerTopActionsSkeleton />
      <PlannerTimelineSectionSkeleton />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlannerList />
      </HydrationBoundary>
    </>
  );
}
