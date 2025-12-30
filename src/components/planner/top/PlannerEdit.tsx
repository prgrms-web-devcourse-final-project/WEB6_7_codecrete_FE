"use client";
import { ConcertDatePicker } from "@/components/concert/detail/ConcertDatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePlanDetail } from "@/lib/api/planner/planner.client";
import { ConcertDetail } from "@/types/concerts";
import { PlanDetail } from "@/types/planner";
import { getConcertStartDate, isSameDay, dateToISOString } from "@/utils/helpers/handleDate";
import { Loader2Icon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function PlannerEdit({
  planDetail,
  concertDetail,
}: {
  planDetail: PlanDetail;
  concertDetail: ConcertDetail;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 플래너 수정 다이얼로그 상태
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // 플래너 제목 및 날짜 상태
  const [plannerTitle, setPlannerTitle] = useState<string>(planDetail.title);
  const [plannerDate, setPlannerDate] = useState<Date | undefined>(new Date(planDetail.planDate));

  // 플래너 수정 핸들러
  const handleEditPlanner = () => {
    if (!plannerTitle.trim()) {
      toast.error("플래너 제목을 입력해주세요.");
      return;
    }
    if (!plannerDate) {
      toast.error("플래너 날짜를 선택해주세요.");
      return;
    }

    // 공연 당일 확인
    const concertStart = getConcertStartDate(concertDetail?.startDate || "");
    if (isSameDay(plannerDate, concertStart)) {
      toast.error("오늘은 공연 시작일이므로 플래너를 생성할 수 없습니다.");
      return;
    }

    try {
      startTransition(async () => {
        try {
          const data = await updatePlanDetail({
            planId: planDetail.id.toString(),
            title: plannerTitle.trim(),
            planDate: dateToISOString(plannerDate),
          });

          // 성공 후 링크 이동
          toast.success("플래너가 수정되었습니다.");
          router.replace(`/planner/${data.data.id}`);
          setEditDialogOpen(false);
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error("플래너 수정 오류:", error);
      toast.error("플래너 수정에 실패했습니다.");
    }
  };

  // 플래너 모달 닫기 핸들러
  const handleClosePlannerModal = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={() => setEditDialogOpen(true)}>
        <PencilIcon className="size-3.5" />
      </Button>
      <Dialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        aria-description="플래너 수정 모달"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>플래너 수정</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] overflow-y-auto p-4">
            <Field>
              <Label>제목</Label>
              <Input
                type="text"
                placeholder="플래너 타이틀을 입력해주세요."
                value={plannerTitle}
                onChange={(e) => setPlannerTitle(e.target.value)}
              />
            </Field>
            <Field>
              <Label>날짜</Label>
              <ConcertDatePicker
                startDate={new Date(concertDetail.startDate)}
                endDate={new Date(concertDetail.endDate)}
                onChange={(date) => setPlannerDate(date)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={handleClosePlannerModal}>
              취소
            </Button>
            <Button
              onClick={handleEditPlanner}
              disabled={!plannerTitle.trim() || !plannerDate || isPending}
            >
              {isPending ? (
                <>
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                  수정 중...
                </>
              ) : (
                "수정"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
