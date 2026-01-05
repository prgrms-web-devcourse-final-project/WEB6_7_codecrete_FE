"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, CopyIcon, LinkIcon, Loader2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PlannerMembers } from "../sidebar/PlannerMembers"; // 경로 확인 필요
import { PlannerParticipant, PlannerParticipantRole, PlannerShareLink } from "@/types/planner";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: PlannerParticipantRole;
  shareLink: PlannerShareLink;
  isCreatingShareLink: boolean;
  isSettingParticipants: boolean;
  isChangingRole: boolean;
  onCreateShareLink: () => void;
  participants: PlannerParticipant[];
  isBanningParticipant: boolean;
  handleRemoveParticipant: (participantId: string) => void;
  handleChangeRole: (participantId: string, nextRole: PlannerParticipantRole) => void;
}

export default function InviteMemberDialog({
  open,
  onOpenChange,
  role,
  shareLink,
  isCreatingShareLink,
  onCreateShareLink,
  participants,
  isSettingParticipants,
  isBanningParticipant,
  handleRemoveParticipant,
  isChangingRole,
  handleChangeRole,
}: InviteMemberDialogProps) {
  const [copied, setCopied] = useState(false);

  // 복사 핸들러
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>친구 초대</DialogTitle>
        </DialogHeader>
        <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
          <Field>
            <FieldLabel>링크 공유하기</FieldLabel>
            {!shareLink.url && (
              <div className="flex justify-between gap-2 text-sm">
                <div className="bg-muted border-input flex h-9 flex-1 items-center rounded-md border px-2">
                  <p className="text-sm">
                    {shareLink.status || "공유 링크를 불러오는 중 오류가 발생했습니다."}
                  </p>
                </div>
                {role === "OWNER" && (
                  <Button type="button" onClick={onCreateShareLink} disabled={isCreatingShareLink}>
                    {isCreatingShareLink ? (
                      <>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <LinkIcon />
                        공유 링크 생성
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
            {shareLink.url && (
              <div className="flex gap-2">
                <Input readOnly value={shareLink.url} className="read-only:bg-muted" />
                <Button
                  className="relative w-12 shrink-0 sm:w-auto"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  <span
                    className={twMerge(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                      copied ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <CheckIcon className="h-4 w-4 stroke-green-600" />
                  </span>
                  <span
                    className={twMerge(
                      "flex items-center gap-1 transition-opacity duration-300",
                      copied ? "opacity-0" : "opacity-100"
                    )}
                  >
                    <CopyIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">복사</span>
                  </span>
                </Button>
              </div>
            )}
          </Field>
          <Separator />
          <PlannerMembers
            isSettingParticipants={isSettingParticipants}
            participants={participants}
            isChangingRole={isChangingRole}
            isBanningParticipant={isBanningParticipant}
            handleRemoveParticipant={handleRemoveParticipant}
            handleChangeRole={handleChangeRole}
            myRole={role}
          />
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
