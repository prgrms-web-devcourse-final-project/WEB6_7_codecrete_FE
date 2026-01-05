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
import { PlannerParticipantRole, PlannerShareLink } from "@/types/planner";
import { Card } from "@/components/ui/card";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: PlannerParticipantRole;
  shareLink: PlannerShareLink;
  isPending: boolean;
  onCreateShareLink: () => void;
}

export default function InviteMemberDialog({
  open,
  onOpenChange,
  role,
  shareLink,
  isPending,
  onCreateShareLink,
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
              <Card className="p-4 text-sm">
                {shareLink.status || "공유 링크를 불러오는 중 오류가 발생했습니다."}
                {role === "OWNER" && (
                  <Button type="button" onClick={onCreateShareLink} disabled={isPending}>
                    {isPending ? (
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
              </Card>
            )}
            {shareLink.url && (
              <div className="flex gap-2">
                <Input readOnly value={shareLink.url} className="read-only:bg-muted" />
                <Button className="relative shrink-0" onClick={handleCopy} disabled={copied}>
                  <span
                    className={twMerge(
                      "transition-all",
                      copied ? "scale-100 opacity-100" : "absolute scale-0 opacity-0"
                    )}
                  >
                    <CheckIcon className="stroke-green-600" />
                  </span>
                  <span
                    className={twMerge(
                      "flex items-center gap-1 transition-all",
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
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
          <PlannerMembers />
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
