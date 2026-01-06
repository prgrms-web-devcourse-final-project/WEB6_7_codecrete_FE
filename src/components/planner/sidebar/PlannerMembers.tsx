import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import ProfileNoImage from "@/components/common/ProfileNoImage";
import { PlannerParticipant, PlannerParticipantRole } from "@/types/planner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";

export function PlannerMembers({
  isSettingParticipants,
  participants,
  isChangingRole,
  isBanningParticipant,
  handleRemoveParticipant,
  handleChangeRole,
  myRole,
}: {
  isSettingParticipants: boolean;
  participants: PlannerParticipant[];
  isChangingRole: boolean;
  isBanningParticipant: boolean;
  handleRemoveParticipant: (participantId: string) => void;
  handleChangeRole: (participantId: string, nextRole: PlannerParticipantRole) => void;
  myRole: PlannerParticipantRole;
}) {
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<PlannerParticipant | null>(null);
  const [nextRole, setNextRole] = useState<PlannerParticipantRole>("VIEWER");

  const openRoleDialog = (participant: PlannerParticipant) => {
    setSelectedParticipant(participant);
    setNextRole(participant.role === "OWNER" ? "EDITOR" : participant.role || "VIEWER");
    setRoleDialogOpen(true);
  };

  const handleConfirmRole = () => {
    if (!selectedParticipant || !nextRole) return;
    handleChangeRole(selectedParticipant.participantId, nextRole);
    setRoleDialogOpen(false);
  };

  return (
    <Field>
      <FieldLabel>멤버</FieldLabel>
      {isSettingParticipants ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-muted/40 border-input flex animate-pulse items-center justify-between gap-4 rounded-2xl border px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <div className="bg-muted size-10 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="bg-muted h-4 w-20 rounded" />
                  <div className="bg-muted h-3 w-16 rounded" />
                </div>
              </div>
              <div className="bg-muted h-8 w-20 rounded" />
            </div>
          ))}
        </div>
      ) : (
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
                {myRole === "OWNER" && m.role !== "OWNER" && (
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
                      onClick={() => handleRemoveParticipant(m.participantId)}
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
      )}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>권한 변경</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
            <Field>
              <Label className="text-text-sub text-sm">
                {selectedParticipant
                  ? `${selectedParticipant.nickname}님의 역할을 선택하세요.`
                  : ""}
              </Label>
              <Select
                value={nextRole || "VIEWER"}
                onValueChange={(value) => setNextRole(value as PlannerParticipantRole)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="역할을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWNER">OWNER (모든 권한)</SelectItem>
                  <SelectItem value="EDITOR">EDITOR (수정 가능)</SelectItem>
                  <SelectItem value="VIEWER">VIEWER (읽기 전용)</SelectItem>
                </SelectContent>
              </Select>
              {nextRole === "OWNER" && (
                <p className="text-sm text-red-500">
                  {selectedParticipant?.nickname}님에게 소유자 역할을 부여할 경우, 이 플래너의 소유
                  권한을 잃고 편집자 권한으로 변경됩니다.
                </p>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleConfirmRole} disabled={isChangingRole}>
              {isChangingRole ? <Loader2Icon className="animate-spin" /> : "변경하기"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Field>
  );
}
