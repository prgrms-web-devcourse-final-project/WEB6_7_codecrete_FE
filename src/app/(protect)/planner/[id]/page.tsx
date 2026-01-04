import PlannerTopActions from "@/components/planner/top/PlannerTopActions";
import PlannerTopHeader from "@/components/planner/top/PlannerTopHeader";
import PlannerBodySection from "@/components/planner/PlannerBodySection";
import { getPlanDetail } from "@/lib/api/planner/planner.server";
import { getUsersMe } from "@/lib/api/user/user.server";
import PlannerError from "@/components/planner/PlannerError";
import { ScheduleDetail } from "@/types/planner";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const planDetail = await getPlanDetail(id);

  if (!planDetail) {
    return <PlannerError />;
  }

  // planDetail.schedules에서 콘서트 일정만 필터링
  const concertSchedules = planDetail.schedules.find(
    (schedule) => schedule.isMainEvent
  ) as ScheduleDetail;

  // 플랜에 참여자로 등록되어 있지 않을 경우
  const me = await getUsersMe();
  let myRole = "";
  if (!planDetail.participants.find((participant) => participant.userId === me.id)) {
    const error = new Error("해당 플래너에 접근할 권한이 없습니다.");
    (error as Error & { statusCode?: number }).statusCode = 403;
    throw error;
  } else {
    myRole =
      planDetail.participants.find((participant) => participant.userId === me.id)?.role || "";
  }

  return (
    <>
      <PlannerTopHeader planDetail={planDetail} role={myRole} />
      <PlannerTopActions
        concertCoords={{
          lat: concertSchedules.locationLat as number,
          lon: concertSchedules.locationLon as number,
        }}
        planId={id}
        schedules={planDetail.schedules}
      />
      <PlannerBodySection
        planId={id}
        schedules={planDetail.schedules}
        concertCoords={{
          lat: concertSchedules.locationLat as number,
          lon: concertSchedules.locationLon as number,
        }}
        role={myRole}
        totalDuration={planDetail.totalDuration}
      />
    </>
  );
}
