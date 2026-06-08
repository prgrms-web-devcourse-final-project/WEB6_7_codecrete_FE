import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UnsavedChangesModalProps } from "@/types/my-page";

export default function UnsavedChangesModal({
  open,
  handleConfirm,
  handleCancel,
}: UnsavedChangesModalProps) {
  return (
    /* 커스텀 훅 변경 전
   <AlertDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        aria-description="모달 닫기"
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>변경 사항을 저장하지 않고 나가시겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsConfirmOpen(false);
                setShowEditDialog(false);
                resetFields();
              }}
            >
              네
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsConfirmOpen(false)}>
              아니오
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog> */
    <AlertDialog open={open} onOpenChange={() => handleCancel()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>변경 사항을 저장하지 않고 나가시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleConfirm}>
            네
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            아니오
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
