"use client";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, UserRoundPlusIcon, MapIcon, Share2Icon } from "lucide-react";
import AddScheduleDialog from "../dialogs/AddScheduleDialog";
import InviteMemberDialog from "../dialogs/InviteMemberDialog";
import LinkShareDialog from "../dialogs/LinkShareDialog";
import {
  ConcertCoords,
  PlannerParticipant,
  PlannerParticipantRole,
  PlannerShareLink,
  ScheduleDetail,
} from "@/types/planner";
import {
  createPlanShareLink,
  deletePlanParticipant,
  getPlanParticipants,
  updatePlanParticipantRole,
} from "@/lib/api/planner/planner.client";
import { getShareBaseUrl } from "@/utils/helpers/domain";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [isCreatingShareLink, startCreatingShareLink] = useTransition();
  const [isSettingParticipants, startSettingParticipants] = useTransition();
  const [isBanningParticipant, startBanningParticipant] = useTransition();
  const [isChangingRole, startChangingRole] = useTransition();

  const [showAdd, setShowAdd] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const [participantsList, setParticipantsList] = useState<PlannerParticipant[]>([]);

  // 공유링크 state
  const [plannerShareLink, setPlannerShareLink] = useState<PlannerShareLink>(shareLink);

  useEffect(() => {
    startSettingParticipants(async () => {
      const participantsList = await getPlanParticipants(planId);
      setParticipantsList(participantsList);
    });
  }, [planId]);

  // 공유 링크 생성 핸들러
  const handleCreateShareLink = () => {
    startCreatingShareLink(async () => {
      try {
        const data = await createPlanShareLink(planId);
        const baseUrl = getShareBaseUrl(plannerShareLink.domain);
        setPlannerShareLink({
          ...plannerShareLink,
          url: `${baseUrl}/planner/share?code=${data.shareToken}`,
        });
      } catch (error) {
        setPlannerShareLink({
          ...plannerShareLink,
          url: "",
          status:
            error instanceof Error ? error.message : "공유 링크를 불러오는 중 오류가 발생했습니다.",
        });
      }
    });
  };

  // 참여자 권한 부여 핸들러
  const handleChangeRole = (participantId: string, nextRole: PlannerParticipantRole) => {
    if (role !== "OWNER") {
      toast.error("플래너 소유자만 권한을 변경할 수 있습니다.");
      return;
    }

    const ownerParticipant = participantsList.find((participant) => participant.role === "OWNER");
    startChangingRole(async () => {
      try {
        await updatePlanParticipantRole({
          planId,
          participantId,
          participantUpdateRole: nextRole,
          participantCurrentRole:
            participantsList.find((p) => p.participantId === participantId)?.role || "VIEWER",
          ownerParticipantId: ownerParticipant ? ownerParticipant.participantId : "",
        });
        setParticipantsList((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.participantId === participantId
              ? { ...participant, role: nextRole }
              : participant
          )
        );
        toast.success("참여자 권한을 변경했습니다.");
        router.refresh();
      } catch (error) {
        console.error("Error changing participant role:", error);
        toast.error("참여자 권한 변경에 실패했습니다. 다시 시도해주세요.");
      }
    });
  };

  // 참여자 추방 핸들러
  const handleRemoveParticipant = (participantId: string) => {
    if (role !== "OWNER") {
      toast.error("플래너 소유자만 참여자를 추방할 수 있습니다.");
      return;
    }

    startBanningParticipant(async () => {
      try {
        await deletePlanParticipant({ planId, participantId });
        const bannedParticipant = participantsList.find(
          (participant) => participant.participantId === participantId
        );
        const updatedParticipants = participantsList.filter(
          (participant) => participant.participantId !== participantId
        );
        setParticipantsList(updatedParticipants);
        toast.success(`${bannedParticipant?.nickname}님을 추방했습니다.`);
      } catch (error) {
        console.error("Error removing participant:", error);
        toast.error("참여자 추방에 실패했습니다. 다시 시도해주세요.");
      }
    });
  };

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
        open={showInvite}
        onOpenChange={setShowInvite}
        role={role}
        isCreatingShareLink={isCreatingShareLink}
        shareLink={plannerShareLink}
        onCreateShareLink={handleCreateShareLink}
        participants={participantsList}
        isSettingParticipants={isSettingParticipants}
        isChangingRole={isChangingRole}
        handleChangeRole={handleChangeRole}
        handleRemoveParticipant={handleRemoveParticipant}
        isBanningParticipant={isBanningParticipant}
      />
      {/* 링크 공유하기 */}
      <LinkShareDialog open={showShare} onOpenChange={setShowShare} />
    </>
  );
}
