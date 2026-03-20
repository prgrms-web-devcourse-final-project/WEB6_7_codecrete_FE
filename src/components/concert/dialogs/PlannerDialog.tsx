"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { ConcertDatePicker } from "../detail/ConcertDatePicker";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { dateToISOString, getConcertStartDate, isSameDay } from "@/utils/helpers/handleDate";
import { createNewPlan } from "@/lib/api/planner/planner.client";
import { toast } from "sonner";
import { ConcertDetail } from "@/types/concerts";

interface PlannerDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  concertDetail: ConcertDetail | null;
}

export default function PlannerDialog({ open, onOpenChange, concertDetail }: PlannerDialogProps) {
  const router = useRouter();

  // 플래너 생성 상태 관리
  const [plannerTitle, setPlannerTitle] = useState<string>("");
  const [plannerDate, setPlannerDate] = useState<Date | undefined>(undefined);

  // 플래너 생성 트랜지션
  const [isCreatingPlan, startPlanCreation] = useTransition();

  // 플래너 생성 핸들러
  const handleCreateNewPlan = () => {
    startPlanCreation(async () => {
      if (!concertDetail?.concertId) {
        toast.error("선택된 공연이 없습니다.");
        return;
      }
      if (!plannerTitle) {
        toast.error("플래너 제목을 입력해주세요.");
        return;
      }
      if (!plannerDate) {
        toast.error("플래너 날짜를 선택해주세요.");
        return;
      }

      // 공연 당일 확인
      const concertStart = getConcertStartDate(concertDetail.startDate);
      if (isSameDay(plannerDate, concertStart)) {
        toast.error("오늘은 공연 시작일이므로 플래너를 생성할 수 없습니다.");
        return;
      }

      const data = await createNewPlan({
        concertId: concertDetail.concertId,
        title: plannerTitle.trim(),
        planDate: dateToISOString(plannerDate),
      });

      if (!data) {
        toast.error("플래너 생성에 실패했습니다.");
        return;
      }

      toast.success("플래너가 생성되었습니다.");
      onOpenChange(false);

      router.push(`/planner/${data.data.id}`);
    });
  };

  if (!concertDetail) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>플래너 만들기</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          해당 공연 정보로 플래너 만들기. 공연 당일은 플래너를 생성할 수 없습니다.
        </DialogDescription>
        <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
          <Field>
            <FieldLabel>제목</FieldLabel>
            <Input
              type="text"
              placeholder="플래너 제목을 입력하세요"
              value={plannerTitle}
              onChange={(e) => setPlannerTitle(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>날짜</FieldLabel>
            <ConcertDatePicker
              startDate={new Date(concertDetail?.startDate?.split("-").join(",") ?? "")}
              endDate={new Date(concertDetail?.endDate?.split("-").join(",") ?? "")}
              onChange={(date) => setPlannerDate(date)}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button disabled={isCreatingPlan} onClick={handleCreateNewPlan}>
            {isCreatingPlan ? (
              <>
                <Loader2Icon className="animate-spin" />
                생성 중...
              </>
            ) : (
              "플래너 만들기"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
