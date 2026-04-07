import PlannerQuickTips from "./timeline/PlannerQuickTips";
import PlannerTimelineSection from "./timeline/PlannerTimelineSection";
import PlannerSidebarContents from "./sidebar/PlannerSidebarContents";
import { ConcertCoords, PlannerParticipantRole, ScheduleDetail } from "@/types/planner";
import MobilePlannerSidebar from "./sidebar/MobilePlannerSidebar";
import { useQuery } from "@tanstack/react-query";
import { plannerQueries } from "@/queries/planner";
import PlannerTimelineSectionSkeleton from "../loading/planner/PlannerTimelineSectionSkeleton";

export default function PlannerBodySection({
  planId,
  schedules,
  concertCoords,
  userRole,
  totalDuration,
}: {
  planId: string;
  schedules: ScheduleDetail[];
  concertCoords: ConcertCoords;
  userRole: PlannerParticipantRole;
  totalDuration: number;
}) {
  const { data: participants, isLoading } = useQuery(plannerQueries.participants(planId));
  const { data: userLocation, isLoading: isUserLocationLoading } = useQuery(
    plannerQueries.userLocation()
  );

  if (isLoading || isUserLocationLoading || !participants) {
    return <PlannerTimelineSectionSkeleton />;
  }

  return (
    <section className="border-border bg-bg-sub border-t px-5 py-8 lg:px-15 lg:py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        {/* === 메인 타임라인 영역 (모바일/데스크톱 모두 보임) === */}
        <div className="w-full flex-1">
          <div className="*:bg-bg-main *:border-border sticky top-30 space-y-6 *:rounded-2xl *:border *:p-5 lg:flex-3 lg:space-y-8 lg:*:p-8">
            <PlannerTimelineSection
              planId={planId}
              schedules={schedules}
              concertCoords={concertCoords}
              userRole={userRole}
              totalDuration={totalDuration}
              userLocation={userLocation}
            />
            <PlannerQuickTips />
          </div>
        </div>

        {/* === 데스크톱 사이드바 === */}
        <div className="hidden lg:block lg:max-w-125">
          <div className="sticky top-30 space-y-8">
            <PlannerSidebarContents participants={participants} schedules={schedules} />
          </div>
        </div>
      </div>
      {/* === 모바일 사이드바 === */}
      <MobilePlannerSidebar participants={participants} schedules={schedules} />
    </section>
  );
}
