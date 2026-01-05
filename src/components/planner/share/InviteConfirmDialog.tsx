"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { declinePlanAsParticipant, joinPlanAsParticipant } from "@/lib/api/planner/planner.client";
import { PlanDetail } from "@/types/planner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface InviteConfirmDialogProps {
  planDetail: PlanDetail;
  inviteCode: string;
}

export function InviteConfirmDialog({ planDetail, inviteCode }: InviteConfirmDialogProps) {
  const [isJoining, startJoinTransition] = useTransition();
  const [isDeclining, startDeclineTransition] = useTransition();
  const router = useRouter();

  const handleJoin = () => {
    startJoinTransition(async () => {
      try {
        const result = await joinPlanAsParticipant(inviteCode);
        if (result) {
          toast.success("플래너에 참가했습니다!");
          router.push(`/planner/${planDetail.id}`);
        } else {
          toast.error("플래너 참가에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error joining plan as participant:", error);
        toast.error("플래너 참가 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    });
  };

  const handleCancel = () => {
    startDeclineTransition(async () => {
      try {
        const result = await declinePlanAsParticipant(inviteCode);
        if (result) {
          toast.success("초대를 거절했습니다.");
          router.push("/");
        } else {
          toast.error("초대 거절에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error declining plan as participant:", error);
        toast.error("초대 거절 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    });
  };

  return (
    <AlertDialog open={true} onOpenChange={() => {}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{planDetail.title} 플래너에 초대되었습니다.</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          플래너에 참가하면 일정과 메모를 함께 확인하고 관리할 수 있어요.
          <br />
          <span className="text-text-main font-semibold">참가하기</span>를 누르면 플래너에 합류하고,{" "}
          <span className="text-text-main font-semibold">취소</span>를 누르면 초대를 거절합니다.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {isDeclining ? "취소 중..." : "취소"}
          </Button>
          <Button type="button" onClick={handleJoin}>
            {isJoining ? "참가 중..." : "참가하기"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
