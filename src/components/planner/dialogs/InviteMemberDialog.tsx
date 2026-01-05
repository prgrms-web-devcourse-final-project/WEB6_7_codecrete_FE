"use client";
import { useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, CopyIcon, LinkIcon, Loader2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PlannerMembers } from "../sidebar/PlannerMembers"; // 경로 확인 필요
import { PlannerParticipant, PlannerParticipantRole, PlannerShareLink } from "@/types/planner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  createPlanShareLink,
  deletePlanParticipant,
  deletePlanShareLink,
  getPlanParticipants,
  updatePlanParticipantRole,
} from "@/lib/api/planner/planner.client";
import { getShareBaseUrl } from "@/utils/helpers/domain";
import { toast } from "sonner";

interface InviteMemberDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: PlannerParticipantRole;
  shareLink: PlannerShareLink;
}

export default function InviteMemberDialog({
  planId,
  open,
  onOpenChange,
  role,
  shareLink,
}: InviteMemberDialogProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const [isCreatingShareLink, startCreatingShareLink] = useTransition();
  const [isDeletingShareLink, startDeletingShareLink] = useTransition();
  const [isSettingParticipants, startSettingParticipants] = useTransition();
  const [isBanningParticipant, startBanningParticipant] = useTransition();
  const [isChangingRole, startChangingRole] = useTransition();

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
        toast.success("공유 링크가 생성되었습니다.");
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

  // 공유 링크 삭제 핸들러
  const handleDeleteShareLink = () => {
    startDeletingShareLink(async () => {
      try {
        await deletePlanShareLink(planId); // 링크 삭제 API 호출
        setPlannerShareLink({ ...plannerShareLink, url: "", status: "공유 링크가 없습니다." }); // 상태 업데이트
        toast.success("공유 링크가 삭제되었습니다.");
      } catch (error) {
        console.error("Failed to copy text: ", error);
        toast.error("공유 링크 삭제에 실패했습니다. 다시 시도해주세요.");
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
            {!plannerShareLink.url && (
              <div className="flex justify-between gap-2 text-sm">
                <div className="bg-muted border-input flex h-9 flex-1 items-center rounded-md border px-2">
                  <p className="text-sm">
                    {plannerShareLink.status || "공유 링크를 불러오는 중 오류가 발생했습니다."}
                  </p>
                </div>
                {role === "OWNER" && (
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
            {plannerShareLink.url && (
              <div className="flex gap-2">
                <Input readOnly value={plannerShareLink.url} className="read-only:bg-muted" />
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
          {plannerShareLink.url && (
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
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    삭제 중...
                  </>
                ) : (
                  "삭제"
                )}
              </Button>
            </Card>
          )}
          <Separator />
          <PlannerMembers
            isSettingParticipants={isSettingParticipants}
            participants={participantsList}
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
