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
import { usePlannerEdit } from "@/hooks/planner/usePlannerEdit";
import { ConcertDetail } from "@/types/concerts";
import { PlanDetail } from "@/types/planner";
import { Loader2Icon, PencilIcon } from "lucide-react";
import { useState } from "react";

export default function PlannerEdit({
  planDetail,
  concertDetail,
}: {
  planDetail: PlanDetail;
  concertDetail: ConcertDetail;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    isPending,
    plannerTitle,
    setPlannerTitle,
    plannerDate,
    setPlannerDate,
    handleEdit,
    handleDelete,
  } = usePlannerEdit(planDetail, concertDetail);

  return (
    <>
      <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
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
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              취소
            </Button>
            <Button
              onClick={() => handleEdit(() => setEditDialogOpen(false))}
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
            <Button
              variant="destructive"
              onClick={() => handleDelete(() => setDeleteDialogOpen(false))}
            >
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
