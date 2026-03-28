import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileNoImage from "@/components/common/ProfileNoImage";
import { PlannerParticipantInfo, PlannerParticipantRole } from "@/types/planner";
import ChangeParticipantRoleDialog from "../dialogs/ChangeParticipantRoleDialog";

interface PlannerMembersProps {
  participants: PlannerParticipantInfo[];
  isChangingRole: boolean;
  isBanningParticipant: boolean;
  handleRemoveParticipant: (participantId: string) => void;
  handleChangeRole: (participantId: string, nextRole: PlannerParticipantRole) => void;
  userRole: PlannerParticipantRole;
}

export function PlannerMembers({
  participants,
  isChangingRole,
  isBanningParticipant,
  handleRemoveParticipant,
  handleChangeRole,
  userRole,
}: PlannerMembersProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<PlannerParticipantInfo | null>(
    null
  );
  const [nextRole, setNextRole] = useState<PlannerParticipantRole>("VIEWER");

  const openRoleDialog = (participant: PlannerParticipantInfo) => {
    setSelectedParticipant(participant);
    setNextRole(participant.role === "OWNER" ? "EDITOR" : participant.role || "VIEWER");
    setDialogOpen(true);
  };

  const handleConfirmRole = () => {
    if (!selectedParticipant || !nextRole) return;
    handleChangeRole(selectedParticipant.participantId.toString(), nextRole);
    setDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-3">
        {participants.map((m) => (
          <div
            key={m.participantId}
            className="bg-muted/40 border-input flex items-center justify-between gap-4 rounded-2xl border px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <Avatar className="size-10">
                <AvatarImage src={m.profileImage} alt={m.nickname} />
                <AvatarFallback>
                  <ProfileNoImage size="sm" alt={m.nickname} />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col gap-1">
                <strong className="text-sm font-medium">{m.nickname}</strong>
                <span className="text-text-sub text-xs">{m.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {userRole === "OWNER" && m.role !== "OWNER" && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    aria-label="권한 변경"
                    type="button"
                    disabled={isChangingRole}
                    onClick={() => openRoleDialog(m)}
                  >
                    권한 변경
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    aria-label="삭제"
                    type="button"
                    onClick={() => handleRemoveParticipant(m.participantId.toString())}
                    disabled={isBanningParticipant}
                  >
                    추방
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* 권한 변경 다이얼로그 */}
      <ChangeParticipantRoleDialog
        participant={selectedParticipant}
        nextRole={nextRole}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onChangeRole={setNextRole}
        onConfirm={handleConfirmRole}
        isChangingRole={isChangingRole}
      />
    </>
  );
}
