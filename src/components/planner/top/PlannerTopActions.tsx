"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, UserRoundPlusIcon, MapIcon, Share2Icon } from "lucide-react";
import AddScheduleDialog from "../dialogs/AddScheduleDialog";
import InviteMemberDialog from "../dialogs/InviteMemberDialog";
import LinkShareDialog from "../dialogs/LinkShareDialog";
import {
  ConcertCoords,
  PlannerParticipantRole,
  PlannerShareLink,
  ScheduleDetail,
} from "@/types/planner";
import Link from "next/link";

interface PlannerTopActionsProps {
  planId: string;
  concertCoords?: ConcertCoords;
  schedules?: ScheduleDetail[];
  role: PlannerParticipantRole;
  shareLink: PlannerShareLink;
}

export default function PlannerTopActions({
  planId,
  concertCoords,
  schedules,
  role,
  shareLink,
}: PlannerTopActionsProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const uniqueCoords = useMemo(() => {
    if (!schedules) return [];

    const coordMap = new Map<string, { lat: number; lon: number; isConcert: boolean }>();

    schedules.forEach((schedule) => {
      if (schedule.locationLat == null || schedule.locationLon == null) return;
      const key = `${schedule.locationLat},${schedule.locationLon}`;
      if (!coordMap.has(key)) {
        coordMap.set(key, {
          lat: schedule.locationLat,
          lon: schedule.locationLon,
          isConcert: schedule.isMainEvent || schedule.concertId != null,
        });
      }
    });

    return Array.from(coordMap.values());
  }, [schedules]);

  const mapLink = useMemo(() => {
    if (uniqueCoords.length === 0) return "";

    if (uniqueCoords.length === 1) {
      const { lat, lon } = uniqueCoords[0];
      return `https://map.naver.com/p/search/${lat},${lon}`;
    }

    // 네이버 지도 - 여러 경유지 지원
    const start = uniqueCoords[0];
    const goal = uniqueCoords[uniqueCoords.length - 1];
    const waypoints = uniqueCoords.slice(1, -1);

    let url = `https://map.naver.com/p/directions/${start.lon},${start.lat},출발`;

    // 경유지 추가
    waypoints.forEach((wp, idx) => {
      url += `/${wp.lon},${wp.lat},경유지${idx + 1}`;
    });

    // 도착지 추가
    url += `/${goal.lon},${goal.lat},도착/-/car`;

    return url;
  }, [uniqueCoords]);

  return (
    <>
      <section className="border-border border-t px-5 py-4 lg:px-15">
        <div className="mx-auto max-w-400">
          <div className="flex justify-between gap-3">
            {/* 왼쪽 그룹: 추가, 초대, 지도 */}
            <div className="flex flex-1 gap-3 lg:flex-none lg:gap-4">
              <Button onClick={() => setShowAdd(true)} variant="default" className="flex-1">
                <PlusIcon className="h-4 w-4" />
                <span className="text-sm">일정 추가하기</span>
              </Button>
              <Button onClick={() => setShowInvite(true)} variant="outline" className="flex-1">
                <UserRoundPlusIcon className="h-4 w-4" />
                <span className="text-sm">친구 초대</span>
              </Button>
              <Link href={mapLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full">
                  <MapIcon className="h-4 w-4" />
                  <span className="text-sm">지도 보기</span>
                </Button>
              </Link>
            </div>

            {/* 오른쪽 그룹: 공유, 저장 */}
            <div className="fixed right-6 bottom-6 z-50 lg:static">
              <Button
                onClick={() => setShowShare(true)}
                variant="default"
                className="size-12 flex-1 rounded-full lg:size-auto lg:rounded-md"
              >
                <Share2Icon className="h-4 w-4" />
                <span className="hidden text-sm lg:block">공유하기</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 일정 추가하기 */}
      <AddScheduleDialog
        planId={planId}
        open={showAdd}
        onOpenChange={setShowAdd}
        defaultCoords={concertCoords}
        schedules={schedules}
      />
      {/* 친구 초대하기 */}
      <InviteMemberDialog
        planId={planId}
        open={showInvite}
        onOpenChange={setShowInvite}
        role={role}
        shareLink={shareLink}
      />
      {/* 링크 공유하기 */}
      <LinkShareDialog open={showShare} onOpenChange={setShowShare} shareLink={shareLink} />
    </>
  );
}
