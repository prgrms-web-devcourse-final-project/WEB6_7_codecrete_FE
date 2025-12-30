import PlannerTopActions from "@/components/planner/PlannerTopActions";
import PlannerTopHeader from "@/components/planner/PlannerTopHeader";
import PlannerTimelineSection from "@/components/planner/PlannerTimelineSection";

export default function Page() {
  return (
    <>
      <PlannerTopHeader />
      <PlannerTopActions />
      <PlannerTimelineSection />
    </>
  );
}
