"use client";
import { PlannerParticipantRole, ScheduleDetail } from "@/types/planner";
import PlannerTopHeader from "./top/PlannerTopHeader";
import { useQuery } from "@tanstack/react-query";
import { plannerQueries } from "@/queries/planner";
import PlannerTopHeaderSkeleton from "../loading/planner/PlannerTopHeaderSkeleton";
import { concertQueries } from "@/queries/concerts";
import PlannerTimelineSectionSkeleton from "../loading/planner/PlannerTimelineSectionSkeleton";
import PlannerTopActionsSkeleton from "../loading/planner/PlannerTopActionsSkeleton";
import dynamic from "next/dynamic";

const PlannerTopActions = dynamic(() => import("./top/PlannerTopActions"), {
  loading: () => <PlannerTopActionsSkeleton />,
});

const PlannerBodySection = dynamic(() => import("./PlannerBodySection"), {
  loading: () => <PlannerTimelineSectionSkeleton />,
});

interface PlannerDetailProps {
  planId: string;
  userRole: PlannerParticipantRole;
  domain: string;
}

export default function PlannerDetail({ planId, userRole, domain }: PlannerDetailProps) {
  const { data: planDetail, isLoading } = useQuery(plannerQueries.detail(planId));
  const { data: concertDetail, isLoading: isConcertLoading } = useQuery(
    concertQueries.detail(planDetail?.concertId.toString() || "")
  );

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

  return (
    <>
      <PlannerTopHeader planDetail={planDetail} userRole={userRole} concertDetail={concertDetail} />
      {(userRole === "OWNER" || userRole === "EDITOR") && (
        <PlannerTopActions
          concertCoords={{
            lat: concertSchedules.locationLat as number,
            lon: concertSchedules.locationLon as number,
          }}
          planId={planId}
          schedules={planDetail.schedules}
          userRole={userRole}
          domain={domain}
        />
      )}
      <PlannerBodySection
        planId={planId}
        schedules={planDetail.schedules}
        concertCoords={{
          lat: concertSchedules.locationLat as number,
          lon: concertSchedules.locationLon as number,
        }}
        userRole={userRole}
        totalDuration={planDetail.totalDuration}
      />
    </>
  );
}
