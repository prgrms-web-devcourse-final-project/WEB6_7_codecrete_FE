import { deletePlanParticipant, updatePlanParticipantRole } from "@/lib/api/planner/planner.client";
import { plannerQueries } from "@/queries/planner";
import { PlannerParticipantRole } from "@/types/planner";
import { useQuery } from "@tanstack/react-query";
import { useTransition } from "react";
import { toast } from "sonner";

export function useParticipantsManage(planId: string, userRole: PlannerParticipantRole) {
  const {
    data: participants = [],
    refetch,
    isLoading,
  } = useQuery(plannerQueries.participants(planId));

  const [isBanning, startBanning] = useTransition();
  const [isChangingRole, startChangingRole] = useTransition();

  const handleChangeRole = (participantId: string, nextRole: PlannerParticipantRole) => {
    if (userRole !== "OWNER") {
      toast.error("플래너 소유자만 권한을 변경할 수 있습니다.");
      return;
    }

    const ownerParticipant = participants?.find((participant) => participant.role === "OWNER");
    startChangingRole(async () => {
      try {
        await updatePlanParticipantRole({
          planId,
          participantId,
          participantUpdateRole: nextRole,
          participantCurrentRole:
            participants?.find((p) => p.participantId === participantId)?.role || "VIEWER",
          ownerParticipantId: ownerParticipant ? ownerParticipant.participantId : "",
        });
        await refetch();
        toast.success("참여자 권한을 변경했습니다.");
      } catch (error) {
        console.error("Error changing participant role:", error);
        toast.error("참여자 권한 변경에 실패했습니다. 다시 시도해주세요.");
      }
    });
  };

  const handleRemove = (participantId: string) => {
    if (userRole !== "OWNER") {
      toast.error("플래너 소유자만 참여자를 추방할 수 있습니다.");
      return;
    }
    const target = participants.find((p) => p.participantId === participantId);

    startBanning(async () => {
      try {
        await deletePlanParticipant({ planId, participantId });
        await refetch();
        toast.success(`${target?.nickname}님을 추방했습니다.`);
      } catch (error) {
        console.error("Error removing participant:", error);
        toast.error("참여자 추방에 실패했습니다. 다시 시도해주세요.");
      }
    });
  };

  return {
    participants,
    isParticipantsLoading: isLoading,
    isChangingRole,
    isBanning,
    handleChangeRole,
    handleRemove,
  };
}
