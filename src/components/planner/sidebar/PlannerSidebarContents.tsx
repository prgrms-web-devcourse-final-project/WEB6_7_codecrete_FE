import PlannerInviteFriends from "./PlannerInviteFriends";
import PlannerMapView from "./PlannerMapView";
import PlannerNearbyRestaurants from "./PlannerNearbyRestaurants";

export default function PlannerSidebarContents() {
  return (
    <div className="flex flex-col space-y-6 *:space-y-4 *:rounded-2xl">
      <PlannerMapView />
      <PlannerInviteFriends />
      <PlannerNearbyRestaurants />
    </div>
  );
}
