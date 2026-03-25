import { createPlanShareLink, deletePlanShareLink } from "@/lib/api/planner/planner.client";
import { plannerQueries, plannerQueryKeys } from "@/queries/planner";
import { PlannerShareLink } from "@/types/planner";
import { formatShareLink } from "@/utils/helpers/formatShareLink";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function useShareLink(planId: string, domain: string, enabled: boolean) {
  const queryClient = useQueryClient();

  const [copied, setCopied] = useState(false);

  const [isCreating, startCreating] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  const {
    data: shareData,
    isLoading,
    isFetching,
  } = useQuery({
    ...plannerQueries.share(planId),
    enabled, // OWNER/EDITOR 아닐 땐 아예 호출 안 함
  });
  const shareLink: PlannerShareLink = formatShareLink(domain, shareData, isLoading || isFetching);

  const handleCreate = () => {
    startCreating(async () => {
      try {
        await createPlanShareLink(planId);
        await queryClient.invalidateQueries({
          queryKey: plannerQueryKeys.share(planId),
        }); // 쿼리 무효화로 최신 데이터 가져오기
        toast.success("공유 링크가 생성되었습니다.");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "공유 링크를 불러오는 중 오류가 발생했습니다."
        );
      }
    });
  };

  const handleDelete = () => {
    startDeleting(async () => {
      try {
        await deletePlanShareLink(planId);
        await queryClient.invalidateQueries({
          queryKey: plannerQueryKeys.share(planId),
        }); // 쿼리 무효화로 최신 데이터 가져오기
        toast.success("공유 링크가 삭제되었습니다.");
      } catch (error) {
        console.error("Failed to delete share link: ", error);
        toast.error("공유 링크 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success("공유 링크가 복사되었습니다.");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("공유 링크 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    shareLink,
    copied,
    isLoadingShareLink: isLoading || isFetching,
    isCreatingShareLink: isCreating,
    isDeletingShareLink: isDeleting,
    handleCreateShareLink: handleCreate,
    handleDeleteShareLink: handleDelete,
    handleCopyShareLink: handleCopy,
  };
}
