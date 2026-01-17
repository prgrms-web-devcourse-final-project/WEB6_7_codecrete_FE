import { PlannerParticipant, ScheduleDetail } from "@/types/planner";
import PlannerInviteFriends from "./PlannerInviteFriends";
import PlannerMapView from "./PlannerMapView";
import PlannerNearbyRestaurants from "./PlannerNearbyRestaurants";
import { Separator } from "@/components/ui/separator";

interface PlannerSidebarContentsProps {
  participants: PlannerParticipant[];
  schedules: ScheduleDetail[];
}

export default function PlannerSidebarContents({
  participants,
  schedules,
}: PlannerSidebarContentsProps) {
  const concertSchedule = schedules.find((s) => s.isMainEvent || s.concertId != null)!;

  return (
    <div className="flex flex-col space-y-6 *:space-y-4 *:rounded-2xl">
      <PlannerMapView schedules={schedules} />
      <Separator className="lg:hidden" />
      <PlannerInviteFriends participants={participants} />
      <Separator className="lg:hidden" />
      <PlannerNearbyRestaurants concertSchedule={concertSchedule} />
    </div>
  );
}
