import PlannerTopActions from "@/components/planner/top/PlannerTopActions";
import PlannerTopHeader from "@/components/planner/top/PlannerTopHeader";
import PlannerBodySection from "@/components/planner/PlannerBodySection";
import { getPlanDetail, getPlanShareLink } from "@/lib/api/planner/planner.server";
import { getUsersMe } from "@/lib/api/user/user.server";
import PlannerError from "@/components/planner/PlannerError";
import { PlannerParticipantRole, PlannerShareLink, ScheduleDetail } from "@/types/planner";
import { headers } from "next/headers";
import { getShareBaseUrl } from "@/utils/helpers/domain";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const domain: string = (await headers()).get("host") || "";

  const planDetail = await getPlanDetail(id);

  if (!planDetail) {
    return <PlannerError />;
  }

  // planDetail.schedules에서 콘서트 일정만 필터링
  const concertSchedules: ScheduleDetail = planDetail.schedules.find(
    (schedule) => schedule.isMainEvent
  )!;

  // 플랜에 참여자로 등록되어 있지 않을 경우
  const me = await getUsersMe();
  let myRole: PlannerParticipantRole = null;
  if (!planDetail.participants.find((participant) => participant.userId === me.id)) {
    const error = new Error("해당 플래너에 접근할 권한이 없습니다.");
    (error as Error & { statusCode?: number }).statusCode = 403;
    throw error;
  } else {
    myRole =
      planDetail.participants.find((participant) => participant.userId === me.id)?.role || null;
  }

  const shareLink: PlannerShareLink = {
    domain: domain,
    url: "",
    status: "",
  };

  try {
    const data = await getPlanShareLink(id);
    const baseUrl = getShareBaseUrl(domain);
    shareLink.url = `${baseUrl}/planner/share?code=${data.shareToken}`;
  } catch (error) {
    shareLink.status =
      error instanceof Error ? error.message : "공유 링크를 불러오는 중 오류가 발생했습니다.";
  }

  return (
    <>
      <PlannerTopHeader planDetail={planDetail} role={myRole} />
      {(myRole === "OWNER" || myRole === "EDITOR") && (
        <PlannerTopActions
          concertCoords={{
            lat: concertSchedules.locationLat as number,
            lon: concertSchedules.locationLon as number,
          }}
          planId={id}
          schedules={planDetail.schedules}
          role={myRole}
          shareLink={shareLink}
        />
      )}
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
