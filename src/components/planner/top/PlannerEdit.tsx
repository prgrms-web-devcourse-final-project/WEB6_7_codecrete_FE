"use client";
import { ConcertDatePicker } from "@/components/concert/detail/ConcertDatePicker";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Separator } from "@/components/ui/separator";
import { deletePlan, updatePlanDetail } from "@/lib/api/planner/planner.client";
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

  // 플래너 삭제 다이얼로그 상태
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  // 플래너 삭제 핸들러
  const handleDeletePlanner = () => {
    try {
      startTransition(async () => {
        try {
          await deletePlan({
            planId: planDetail.id.toString(),
          });

          // 성공 후 링크 이동
          toast.success("플래너가 삭제되었습니다.");
          router.replace(`/planner`);
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

  return (
    <>
      <Button variant="ghost" onClick={() => setEditDialogOpen(true)}>
        <PencilIcon className="size-3.5" />
      </Button>
      {/* 플래너 수정 모달 */}
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
            <Separator />
            <div className="border-border relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
              <div className="flex grow gap-3">
                <div className="grid grow gap-2">
                  <Label htmlFor="darkMode">플래너 삭제</Label>
                  <p className="text-text-sub text-sm">플래너를 삭제합니다.</p>
                </div>
                <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                  삭제
                </Button>
              </div>
            </div>
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
      {/* 플래너 삭제 확인 모달 */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        aria-description="플래너 삭제 확인"
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>플래너를 삭제하시겠어요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            현재까지 작성된 내용은 즉시 삭제되며, 복구할 수 없습니다.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeletePlanner}>
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
