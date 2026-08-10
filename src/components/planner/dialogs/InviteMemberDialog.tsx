"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, CopyIcon, LinkIcon, Loader2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PlannerMembers } from "../sidebar/PlannerMembers"; // 경로 확인 필요
import { PlannerParticipantRole } from "@/types/planner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useShareLink } from "@/hooks/useShareLink";
import PlannerShareLinkSkeleton from "@/components/loading/planner/PlannerShareLinkSkeleton";
import { useParticipantsManage } from "@/hooks/planner/useParticipantsManage";
import PlannerMembersSkeleton from "@/components/loading/planner/PlannerMembersSkeleton";

interface InviteMemberDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: PlannerParticipantRole;
  domain: string;
}

export default function InviteMemberDialog({
  planId,
  open,
  onOpenChange,
  userRole,
  domain,
}: InviteMemberDialogProps) {
  const {
    shareLink,
    copied,
    isLoadingShareLink,
    isCreatingShareLink,
    isDeletingShareLink,
    handleCreateShareLink,
    handleDeleteShareLink,
    handleCopyShareLink,
  } = useShareLink(planId, domain, userRole === "OWNER" || userRole === "EDITOR");
  const {
    participants,
    isParticipantsLoading,
    isChangingRole,
    isBanning,
    handleChangeRole,
    handleRemove,
  } = useParticipantsManage(planId, userRole);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>친구 초대</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          친구를 초대하여 함께 플래너를 만들어보세요. 공유 링크를 복사하거나 멤버 관리에서 권한을
          설정할 수 있습니다.
        </DialogDescription>
        <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
          <Field>
            <FieldLabel>링크 공유하기</FieldLabel>
            {isLoadingShareLink && <PlannerShareLinkSkeleton />}
            {!isLoadingShareLink && !shareLink.url && (
              <div className="flex justify-between gap-2 text-sm">
                <div className="bg-muted border-input flex h-9 flex-1 items-center rounded-md border px-2">
                  <p className="text-sm">
                    {shareLink.status || "공유 링크를 불러오는 중 오류가 발생했습니다."}
                  </p>
                </div>
                {userRole === "OWNER" && (
                  <Button
                    type="button"
                    onClick={handleCreateShareLink}
                    disabled={isCreatingShareLink}
                  >
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
            {!isLoadingShareLink && shareLink.url && (
              <div className="flex gap-2">
                <Input readOnly value={shareLink.url} className="read-only:bg-muted" />
                <Button
                  className="relative w-12 shrink-0 sm:w-auto"
                  onClick={handleCopyShareLink}
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
          {shareLink.url && (
            <Card className="flex-row justify-between gap-2 p-4">
              <div className="space-y-1">
                <CardTitle>링크 삭제</CardTitle>
                <CardDescription>
                  <p>링크를 삭제하면 더 이상 해당 링크로 초대할 수 없습니다.</p>
                </CardDescription>
              </div>
              <Button
                variant="destructive"
                type="button"
                onClick={handleDeleteShareLink}
                disabled={isDeletingShareLink}
              >
                {isDeletingShareLink ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "삭제"
                )}
              </Button>
            </Card>
          )}
          <Separator />
          <Field>
            <FieldLabel>멤버</FieldLabel>
            {isParticipantsLoading && <PlannerMembersSkeleton />}
            {!isParticipantsLoading && (
              <PlannerMembers
                participants={participants || []}
                isChangingRole={isChangingRole}
                isBanningParticipant={isBanning}
                handleRemoveParticipant={handleRemove}
                handleChangeRole={handleChangeRole}
                userRole={userRole}
              />
            )}
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
