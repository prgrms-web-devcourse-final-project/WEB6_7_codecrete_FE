"use client";
import { useState } from "react";
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
              <Button variant="outline" className="flex-1">
                <MapIcon className="h-4 w-4" />
                <span className="text-sm">지도 보기</span>
              </Button>
            </div>

            {/* 오른쪽 그룹: 공유, 저장 */}
            <div className="bg-bg-main border-border fixed right-0 bottom-0 left-0 z-50 flex gap-3 border-t px-5 py-4 lg:static lg:z-0 lg:gap-4 lg:border-none lg:p-0">
              <Button onClick={() => setShowShare(true)} variant="default" className="flex-1">
                <Share2Icon className="h-4 w-4" />
                <span className="text-sm">공유하기</span>
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
      <LinkShareDialog open={showShare} onOpenChange={setShowShare} />
    </>
  );
}
