"use client";
import { PlannerParticipantRole, PlannerShareLink, ScheduleDetail } from "@/types/planner";
import PlannerTopHeader from "./top/PlannerTopHeader";
import { useQuery } from "@tanstack/react-query";
import { plannerQueries } from "@/queries/planner";
import PlannerTopHeaderSkeleton from "../loading/planner/PlannerTopHeaderSkeleton";
import PlannerTopActions from "./top/PlannerTopActions";
import { getShareBaseUrl } from "@/utils/helpers/domain";
import { concertQueries } from "@/queries/concerts";

interface PlannerDetailProps {
  planId: string;
  role: PlannerParticipantRole;
  domain: string;
}

export default function PlannerDetail({ planId, role, domain }: PlannerDetailProps) {
  const { data: planDetail, isLoading } = useQuery(plannerQueries.detail(planId));
  const { data: concertDetail, isLoading: isConcertLoading } = useQuery(
    concertQueries.detail(planDetail?.concertId.toString() || "")
  );
  const {
    data: shareData,
    isLoading: isShareLoading,
    error: shareError,
  } = useQuery(plannerQueries.share(planId));

  if (isLoading || isConcertLoading || !planDetail || !concertDetail)
    return <PlannerTopHeaderSkeleton />;

  // 콘서트 일정 추출(메인 이벤트 또는 concertId가 있는 일정)
  const concertSchedules: ScheduleDetail = planDetail.schedules.find(
    (schedule) => schedule.isMainEvent
  )!;

  // 공유 링크 정보 구성
  const shareLink: PlannerShareLink = { domain, url: "", status: "" };
  if (shareData) {
    const baseUrl = getShareBaseUrl(domain);
    shareLink.url = `${baseUrl}/planner/share?code=${shareData.shareToken}`;
  } else if (isShareLoading) {
    shareLink.status = "공유 링크를 불러오는 중입니다...";
  } else if (shareError instanceof Error) {
    shareLink.status = shareError.message;
  }

  return (
    <>
      <PlannerTopHeader planDetail={planDetail} role={role} concertDetail={concertDetail} />
      {(role === "OWNER" || role === "EDITOR") && (
        <PlannerTopActions
          concertCoords={{
            lat: concertSchedules.locationLat as number,
            lon: concertSchedules.locationLon as number,
          }}
          planId={planId}
          schedules={planDetail.schedules}
          role={role}
          shareLink={shareLink}
        />
      )}
      {/* <PlannerBodySection
        planId={id}
        schedules={planDetail.schedules}
        concertCoords={{
          lat: concertSchedules.locationLat as number,
          lon: concertSchedules.locationLon as number,
        }}
        role={role}
        totalDuration={planDetail.totalDuration}
      /> */}
    </>
  );
}
