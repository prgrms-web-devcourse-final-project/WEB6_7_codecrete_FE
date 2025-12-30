import PlannerTopActions from "@/components/planner/top/PlannerTopActions";
import PlannerTopHeader from "@/components/planner/top/PlannerTopHeader";
import PlannerTimelineSection from "@/components/planner/PlannerTimelineSection";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <PlannerTopHeader planId={id} />
      <PlannerTopActions />
      <PlannerTimelineSection />
    </>
  );
}
