import PlannerTopHeaderSkeleton from "@/components/loading/planner/PlannerTopHeaderSkeleton";
import PlannerTopActionsSkeleton from "@/components/loading/planner/PlannerTopActionsSkeleton";
import PlannerTimelineSectionSkeleton from "@/components/loading/planner/PlannerTimelineSectionSkeleton";

export default function Page() {
  return (
    <>
      <PlannerTopHeaderSkeleton />
      <PlannerTopActionsSkeleton />
      <PlannerTimelineSectionSkeleton />
    </>
  );
}
