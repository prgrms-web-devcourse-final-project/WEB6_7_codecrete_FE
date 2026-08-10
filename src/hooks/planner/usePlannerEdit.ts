import { deletePlan, updatePlanDetail } from "@/lib/api/planner/planner.client";
import { ConcertDetail } from "@/types/concerts";
import { PlanDetail } from "@/types/planner";
import { dateToISOString, getConcertStartDate, isSameDay } from "@/utils/helpers/handleDate";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function usePlannerEdit(planDetail: PlanDetail, concertDetail: ConcertDetail) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [plannerTitle, setPlannerTitle] = useState<string>(planDetail.title);
  const [plannerDate, setPlannerDate] = useState<Date | undefined>(new Date(planDetail.planDate));

  const validate = () => {
    if (!plannerTitle.trim()) {
      toast.error("플래너 제목을 입력해주세요.");
      return false;
    }
    if (!plannerDate) {
      toast.error("플래너 날짜를 선택해주세요.");
      return false;
    }

    const concertStart = getConcertStartDate(concertDetail?.startDate || "");
    if (isSameDay(plannerDate, concertStart)) {
      toast.error("오늘은 공연 시작일이므로 플래너를 생성할 수 없습니다.");
      return false;
    }
    return true;
  };

  const handleEdit = (onSuccess: () => void) => {
    if (!validate()) return;

    startTransition(async () => {
      try {
        const data = await updatePlanDetail({
          planId: planDetail.id.toString(),
          title: plannerTitle.trim(),
          planDate: dateToISOString(plannerDate!),
        });

        // 성공 후 링크 이동
        toast.success("플래너가 수정되었습니다.");
        router.replace(`/planner/${data.data.id}`);
        onSuccess();
      } catch (error) {
        console.error("플래너 수정 오류:", error);
        toast.error("플래너 수정에 실패했습니다.");
      }
    });
  };

  const handleDelete = (onSuccess: () => void) => {
    startTransition(async () => {
      try {
        await deletePlan({
          planId: planDetail.id.toString(),
        });

        toast.success("플래너가 삭제되었습니다.");
        router.replace("/planner");
        onSuccess();
      } catch (error) {
        console.error("플래너 삭제 오류:", error);
        toast.error("플래너 삭제에 실패했습니다.");
      }
    });
  };

  return {
    isPending,
    plannerTitle,
    setPlannerTitle,
    plannerDate,
    setPlannerDate,
    handleEdit,
    handleDelete,
  };
}
