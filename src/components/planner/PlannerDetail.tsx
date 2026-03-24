"use client";
import { PlannerParticipantRole, PlannerShareLink, ScheduleDetail } from "@/types/planner";
import PlannerTopHeader from "./top/PlannerTopHeader";
import { useQuery } from "@tanstack/react-query";
import { plannerQueries } from "@/queries/planner";
import PlannerTopHeaderSkeleton from "../loading/planner/PlannerTopHeaderSkeleton";
import PlannerTopActions from "./top/PlannerTopActions";
import { getShareBaseUrl } from "@/utils/helpers/domain";
import { concertQueries } from "@/queries/concerts";
import PlannerBodySection from "./PlannerBodySection";
import PlannerTimelineSectionSkeleton from "../loading/planner/PlannerTimelineSectionSkeleton";
import PlannerTopActionsSkeleton from "../loading/planner/PlannerTopActionsSkeleton";

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
  const { data: shareData, isLoading: isShareLoading } = useQuery({
    ...plannerQueries.share(planId),
    enabled: role === "OWNER" || role === "EDITOR", // 공유 링크는 OWNER와 EDITOR만 필요하므로 조건부로 쿼리 실행
  });

  if (isLoading || isConcertLoading || !planDetail || !concertDetail)
    return (
      <>
        <PlannerTopHeaderSkeleton />
        <PlannerTopActionsSkeleton />
        <PlannerTimelineSectionSkeleton />
      </>
    );

  // 콘서트 일정 추출(메인 이벤트 또는 concertId가 있는 일정)
  const concertSchedules: ScheduleDetail = planDetail.schedules.find(
    (schedule) => schedule.isMainEvent
  )!;

  // 공유 링크 정보 구성
  const shareLink: PlannerShareLink = { domain, url: "", status: "" };
  if (shareData?.status === "ok") {
    const baseUrl = getShareBaseUrl(domain);
    shareLink.url = `${baseUrl}/planner/share?code=${shareData.data.shareToken}`;
  } else if (isShareLoading) {
    shareLink.status = "공유 링크를 불러오는 중입니다...";
  } else if (shareData?.status === "not_created") {
    shareLink.status = "아직 공유 링크가 생성되지 않았습니다.";
  } else if (shareData?.status === "forbidden") {
    shareLink.status = shareData.message;
  } else if (shareData?.status === "error") {
    shareLink.status = shareData.message;
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
      <PlannerBodySection
        planId={planId}
        schedules={planDetail.schedules}
        concertCoords={{
          lat: concertSchedules.locationLat as number,
          lon: concertSchedules.locationLon as number,
        }}
        role={role}
        totalDuration={planDetail.totalDuration}
      />
    </>
  );
}
