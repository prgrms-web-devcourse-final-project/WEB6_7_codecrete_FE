import PlannerQuickTips from "./timeline/PlannerQuickTips";
import PlannerTimelineSection from "./timeline/PlannerTimelineSection";
import PlannerSidebarContents from "./sidebar/PlannerSidebarContents";
import { ConcertCoords, PlannerParticipantRole, ScheduleDetail } from "@/types/planner";

export default function PlannerBodySection({
  planId,
  schedules,
  concertCoords,
  role,
  totalDuration,
}: {
  planId: string;
  schedules: ScheduleDetail[];
  concertCoords: ConcertCoords;
  role: PlannerParticipantRole;
  totalDuration: number;
}) {
  return (
    <section className="border-border bg-bg-sub border-t px-5 py-8 lg:px-15 lg:py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        {/* === 메인 타임라인 영역 (모바일/데스크톱 모두 보임) === */}
        <div className="*:bg-bg-main *:border-border w-full flex-1 space-y-6 *:rounded-2xl *:border *:p-5 lg:flex-3 lg:space-y-8 lg:*:p-8">
          <PlannerTimelineSection
            planId={planId}
            schedules={schedules}
            concertCoords={concertCoords}
            role={role}
            totalDuration={totalDuration}
          />
          <PlannerQuickTips />
        </div>

        {/* === 데스크톱 사이드바 === */}
        <div className="hidden lg:block lg:max-w-125 lg:flex-1">
          <div className="sticky top-30 space-y-8">
            <PlannerSidebarContents />
          </div>
        </div>
      </div>
    </section>
  );
}
