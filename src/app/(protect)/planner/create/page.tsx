import PlannerTopHeaderSkeleton from "@/components/loading/planner/PlannerTopHeaderSkeleton";
import PlannerTopActionsSkeleton from "@/components/loading/planner/PlannerTopActionsSkeleton";
import PlannerTimelineSectionSkeleton from "@/components/loading/planner/PlannerTimelineSectionSkeleton";
import PlannerCreate from "@/components/planner/PlannerCreate";

export default function Page() {
  return (
    <>
      <PlannerTopHeaderSkeleton />
      <PlannerTopActionsSkeleton />
      <PlannerTimelineSectionSkeleton />
      <PlannerCreate />
    </>
  );
}
