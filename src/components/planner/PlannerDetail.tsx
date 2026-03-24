"use client";

import { PlannerParticipantRole } from "@/types/planner";
import PlannerTopHeader from "./top/PlannerTopHeader";
import { useQuery } from "@tanstack/react-query";
import { plannerQueries } from "@/queries/planner";
import PlannerTopHeaderSkeleton from "../loading/planner/PlannerTopHeaderSkeleton";

interface PlannerDetailProps {
  planId: string;
  role: PlannerParticipantRole;
}

export default function PlannerDetail({ planId, role }: PlannerDetailProps) {
  const { data: planDetail, isLoading } = useQuery(plannerQueries.detail(planId));

  if (!planDetail || isLoading) return <PlannerTopHeaderSkeleton />;

  return (
    <>
      <PlannerTopHeader planDetail={planDetail} role={role} />
      {/* {(role === "OWNER" || role === "EDITOR") && (
        <PlannerTopActions
          concertCoords={{
            lat: concertSchedules.locationLat as number,
            lon: concertSchedules.locationLon as number,
          }}
          planId={id}
          schedules={planDetail.schedules}
          role={role}
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
        role={role}
        totalDuration={planDetail.totalDuration}
      /> */}
    </>
  );
}
