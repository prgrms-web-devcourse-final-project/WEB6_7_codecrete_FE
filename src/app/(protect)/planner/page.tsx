import PlannerTopHeaderSkeleton from "@/components/loading/planner/PlannerTopHeaderSkeleton";
import PlannerTopActionsSkeleton from "@/components/loading/planner/PlannerTopActionsSkeleton";
import PlannerTimelineSectionSkeleton from "@/components/loading/planner/PlannerTimelineSectionSkeleton";
import { getPlanList } from "@/lib/api/planner/planner.server";
import PlannerLists from "@/components/planner/PlannerLists";

export default async function Page() {
  const planLists = await getPlanList();

  return (
    <>
      <PlannerTopHeaderSkeleton />
      <PlannerTopActionsSkeleton />
      <PlannerTimelineSectionSkeleton />
      <PlannerLists planLists={planLists} />
    </>
  );
}
